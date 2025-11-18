import { useCollection, useFirebaseAuth } from "vuefire";
import { collection, addDoc, DocumentReference, type DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { reactive } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import z from "zod";

const userSchema = z.object({
    firstname: z.string().min(1, "First name is required"),
    middlename: z.string().optional().or(z.literal("")),
    lastname: z.string().min(1, "Last name is required"),

    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    address: z.object({
        street: z.string().min(1, "Street is required"),
        barangay: z.string().min(1, "Barangay is required"),
        city: z.string().min(1, "City is required"),
        province: z.string().min(1, "Province is required"),
        zipcode: z.string().min(1, "Zipcode is required"),
        role: z.enum(["worker"]), // fixed role
    }),
});

export function useWorker() {
    const users = useCollection(collection(db, "users"));
    const auth = useFirebaseAuth();

    const form = reactive({
        firstname: "",
        middlename: "",
        lastname: "",


        email: "",
        password: "",

        // For the address
        address: {
            street: "",
            barangay: "",
            city: "",
            province: "",
            zipcode: "",
            role: "worker"
        }
    });

    const create = async (): Promise<[DocumentReference<DocumentData, DocumentData> | null, any]> => {
        try {

            const validated = z.parse(userSchema, form);

            // Create ang account
            const user = await createUserWithEmailAndPassword(auth!, validated.email, validated.password);
            console.log("User created with ID", user.user.uid);


            // Add ang personal info
            const docRef = await addDoc(collection(db, "users"), { user_uid: user.user.uid, ...validated });
            console.log("Document written with ID:", docRef.id);

            return [docRef, null];
        } catch (error) {
            return [null, error];
        }
    }

    const getUsers = () => {
        return users.data.value;
    }


    return {
        create,
        getUsers,

        form,
    }
}