import { db } from "@/firebase";
import type { User } from "@/models/user";
import { collection, getDocs, getDoc, addDoc } from "firebase/firestore";

const usersCol = collection(db, "users");


export async function getAllUsers() {
    const snapshot = await getDocs(usersCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function createUser(data: Partial<User>) {
    return await addDoc(usersCol, data);
}
