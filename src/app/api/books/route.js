import { uploadImage } from "@/utils/cloudinaryImage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { fireStore } from "@/contexts/firebase";


// POST REQ
export async function POST(req) {
  const body = await req.json();

  let imageUrl = "";
  let imagePublicId = "";

  if (body.bookImage) {
    const image = await uploadImage(body.bookImage);
    imageUrl = image.imageUrl;
    imagePublicId = image.publicId;
  }

  const docRef = await addDoc(collection(fireStore, "books"), {
    title: body.title,
    price: Number(body.price),
    category: body.category,
    description: body.description,
    imageUrl,
    imagePublicId,
    author: body.author,
    createdAt: new Date(),
  });

  return Response.json({ id: docRef.id });
}


// GET REQ
export async function GET() {
  const snapshot = await getDocs(collection(fireStore, "books"));

  const books = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return Response.json(books);
}