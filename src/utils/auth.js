import { GoogleAuthProvider , signInWithPopup , signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "@/contexts/firebase";

export const signupWithEmail = async (email , password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response;
}

export const signinWithEmail = async (email , password) => {
    const response = await signInWithEmailAndPassword(auth , email, password);
    return response;
}


export const googleLogin = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    const response = signInWithPopup(auth, googleAuthProvider);
    return response;
}