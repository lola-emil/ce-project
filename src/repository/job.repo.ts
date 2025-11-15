import { db } from "@/firebase";
import type { User } from "@/models/user";
import { collection, getDocs, getDoc, addDoc } from "firebase/firestore";

const jobCol = collection(db, "job");


export async function getAllJobs() {
    const snapshot = await getDocs(jobCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function createUser(data: Partial<User>) {
    return await addDoc(jobCol, data);
}
