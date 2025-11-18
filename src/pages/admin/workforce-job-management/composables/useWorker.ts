import { useCollection, useFirebaseAuth } from "vuefire";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { reactive } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";



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

    const create = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), form);
            console.log("Document written with ID:", docRef.id);
            const user = await createUserWithEmailAndPassword(auth!, form.email, form.password);
            console.log("User created with ID", user.user.uid);
        } catch (error) {
            console.error("Error adding document: ", error);
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