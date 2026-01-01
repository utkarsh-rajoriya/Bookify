import {set, ref} from 'firebase/database'
import {addDoc, collection } from "firebase/firestore";
import { db, fireStore } from "../contexts/firebase";

// put sample code (fileStore)
export const putData = async (name, age, company) => {
  await addDoc(collection(fireStore, 'users') , {
    name : name,
    age : age,
    company : company
  })
};

// put sample code (realtime db)
// export const putData = (id, name, age, company) => {
//   set(ref(db, "users/" + id), {
//     id: id,
//     name: name,
//     age: age,
//     company: company
//   });
// };
