import { useCollection, useFirebaseAuth } from "vuefire";
import { collection, addDoc, DocumentReference, type DocumentData, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { reactive } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import z, { ZodError } from "zod";
import type { FirebaseError } from "firebase/app";


function generateTempPassword(length = 12) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}


export type WorkerForm = {
    name: {
        firstname: string,
        middlename?: string,
        lastname: string,
    }


    email: string,
    password: string,
    role: "worker",

    // For the address
    address: {
        addressLine1: string,
        addressLine2: string,
        city: string,
        province: string,
        zipcode: string,
    }
}

export type WorkerFormError = {
    name: {
        firstname: string[],
        middlename?: string[],
        lastname: string[],
    }


    email: string[],
    password: string[],
    // role: "worker",

    // For the address
    address: {
        addressLine1: string[],
        addressLine2: string[],
        city: string[],
        province: string[],
        zipCode: string[],
    },
    phoneNumber: string[]
}

const userSchema = z.object({
    name: z.object({
        firstname: z.string().min(1, "First name is required"),
        middlename: z.string().optional().or(z.literal("")),
        lastname: z.string().min(1, "Last name is required"),
    }),
    email: z.email("Invalid email address"),
    phoneNumber: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["worker"]), // fixed role

    address: z.object({
        addressLine1: z.string().min(1, "Street is required"),
        addressLine2: z.string().optional(),
        city: z.string().min(1, "City is required"),
        province: z.string().min(1, "Province is required"),
        zipCode: z.string().min(1, "Zipcode is required"),
    }),

    workerDocuments: z
        .array(z.string().min(0))   
        .optional()
});

export function useWorker() {
    const users = useCollection(collection(db, "users"));
    const auth = useFirebaseAuth();

    const form = reactive({
        name: {
            firstname: "",
            middlename: "",
            lastname: "",

        },

        email: "",
        password: "",
        role: "worker",

        phoneNumber: "",

        // For the address
        address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            province: "",
            zipCode: "",
        },
        workerDocuments: <string[]>[]
    });


    const create = async (): Promise<[DocumentReference<DocumentData, DocumentData> | null, ZodError | FirebaseError | null]> => {
        try {

            form.password = generateTempPassword(10);
            const validated = z.parse(userSchema, form);

            // Create ang account
            const user = await createUserWithEmailAndPassword(auth!, validated.email, validated.password);
            console.log("User created with ID", user.user.uid);

            const data = {
                uid: user.user.uid,
                role: form.role,
                name: form.name,
                address: [
                    {
                        ...form.address
                    }
                ],
                email: form.email,
                contactInfo: {
                    email: form.email,
                    phoneNumber: form.phoneNumber
                },
                workerDocuments: form.workerDocuments,
                createdAt: serverTimestamp(),
                tempPassword: form.password,
                passwordIsTemp: true
            };
            // Add ang personal info
            const userDocRef = doc(db, "users", user.user.uid);
            await setDoc(userDocRef, data);

            console.log("Document written with ID:", userDocRef.id);

            return [userDocRef, null];
        } catch (error) {
            console.error(error);
            return [null, error as FirebaseError | ZodError];
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