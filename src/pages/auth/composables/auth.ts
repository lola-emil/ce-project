import { useFirebaseAuth } from "vuefire";
import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, type UserCredential } from "firebase/auth";
import { reactive, ref } from "vue";
import z, { ZodError } from "zod";
import { FirebaseError } from "firebase/app";


export function useLogin() {
    const auth = useFirebaseAuth();

    const loginForm = reactive({
        email: "",
        password: ""
    });

    const isLoading = ref<boolean>(false);

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        isLoading.value = true;

        signInWithPopup(auth!, provider)
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.error("Failed to signin redirect", error)
            }).finally(() => {
                isLoading.value = false;
            })
    }

    const loginWithEmailAndPassword = () => {
        isLoading.value = true;
        signInWithEmailAndPassword(auth!, loginForm.email, loginForm.password)
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.error("Error signing in with email and password", error);
            }).finally(() => {
                isLoading.value = false;
            })
    }




    const clearForm = () => {
        loginForm.email = "";
        loginForm.password = "";

    }

    return {
        loginWithGoogle,
        loginWithEmailAndPassword,
        clearForm,

        loginForm,
        isLoading
    };
}



export function useRegister() {
    const registerSchema = z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Passwowrd must be at least 8 characters")
            .max(32, "Password must be at most 32 characters"),
        confirm_password: z.string()
    }).refine(data => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    })


    const isLoading = ref<boolean>(false);
    const auth = useFirebaseAuth();


    const registrationForm = reactive({
        email: "",
        password: "",
        confirm_password: ""
    })

    const registerEmailAndPassword = async (): Promise<[UserCredential | null, ZodError | FirebaseError | null]> => {
        try {
            isLoading.value = true;
            const validated = registerSchema.parse(registrationForm);

            const data = await createUserWithEmailAndPassword(auth!, validated.email, validated.password)
            return [data, null];
        } catch (error) {
            if (error instanceof FirebaseError) return [null, error]
            if (error instanceof ZodError) return [null, error];

        } finally {
            isLoading.value = false;
        }

        return [null, null];
    }

    const clearForm = () => {
        registrationForm.email = "";
        registrationForm.password = "";
        registrationForm.confirm_password = "";
    }

    return {
        registerEmailAndPassword,
        clearForm,

        registrationForm,
        isLoading
    }
}