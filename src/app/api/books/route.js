export const runtime = "nodejs";

import { uploadImage } from "@/utils/cloudinaryImage";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { fireStore } from "@/contexts/firebase";

export async function POST(req) {
  try {
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
      authorId: body.authorId,
      createdAt: new Date(),
    });

    return Response.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/books failed:", error);
    return Response.json({ error: "Failed to create book" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    let booksQuery;

    if (uid) {
      booksQuery = query(
        collection(fireStore, "books"),
        where("authorId", "==", uid)
      );
    } else {
      booksQuery = collection(fireStore, "books");
    }

    const snapshot = await getDocs(booksQuery);

    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(books, { status: 200 });
  } catch (error) {
    console.error("GET /api/books failed:", error);
    return Response.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
