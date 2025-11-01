import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import type { JobPostBody } from "@/types";



export async function createJobPost(job: JobPostBody) {
  try {
    const docRef = await addDoc(collection(db, 'job_posts'), job)
    return docRef.id;
  } catch (error) {
    console.error('Error adding job post:', error)
  }
}