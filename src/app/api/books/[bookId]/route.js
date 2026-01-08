export const runtime = "nodejs";

import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { fireStore } from "@/contexts/firebase";
import { deleteImage } from "@/utils/cloudinaryImage";

export async function DELETE(req, {params}) {
  try {
    const { bookId } = await params;

    if (!bookId) {
      return Response.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const bookRef = doc(fireStore, "books", bookId);
    const snapshot = await getDoc(bookRef);

    if (!snapshot.exists()) {
      return Response.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const book = snapshot.data();
    if (book?.imagePublicId) {
      try {
        await deleteImage(book.imagePublicId);
      } catch (imgErr) {
        console.error("Cloudinary delete failed:", imgErr);
      }
    }

    await deleteDoc(bookRef);

    return Response.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/books/[bookId] failed:", error);
    return Response.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
