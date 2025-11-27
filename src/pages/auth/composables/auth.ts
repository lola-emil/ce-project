import { useFirebaseAuth } from "vuefire";
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    type UserCredential
} from "firebase/auth";
import { reactive, ref } from "vue";
import z, { treeifyError, ZodError } from "zod";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { FirebaseError } from "firebase/app";

export function useLogin() {
    const auth = useFirebaseAuth();
    const authStore = useAuthStore();
    const router = useRouter();

    const loginForm = reactive({
        email: "",
        password: ""
    });
    
    const formError = reactive({
        email: "",
        password: ""
    })

    const isLoading = ref<boolean>(false);

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        isLoading.value = true;

        signInWithPopup(auth!, provider)
            .then(data => {
                console.log(data);
                router.push("/setup-account");
            }).catch(error => {
                console.error("Failed to signin redirect", error)
            }).finally(() => {
                isLoading.value = false;
            })
    }

    const loginWithEmailAndPassword = async () => {
        isLoading.value = true;
        try {
            await authStore.loginWithEmailPassword(loginForm.email, loginForm.password);
            router.push("/setup-account");
        } catch (error) {
            const firebaseError = error as FirebaseError;
            console.log(firebaseError.code);

            if (firebaseError.code == "auth/user-not-found") {
                formError.email = "User not found";
            }

            if (firebaseError.code == "auth/wrong-password") {
                formError.password = "Incorrect password"
            }
        } finally {
            isLoading.value = false;
        }
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
        isLoading,
        formError
    };
}



type RegisterForm = {
    email: string;
    password: string;
    confirm_password: string;
}


type RegisterFormError = {
    email: string[];
    password: string[];
    confirm_password: string[];
}


export function useRegister() {
    const registerSchema = z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters")
            .max(32, "Password must be at most 32 characters"),
        confirm_password: z.string()
    }).refine(data => data.password == data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });


    const isLoading = ref<boolean>(false);
    const firebaseAuth = useFirebaseAuth();
    const router = useRouter();


    const formError = ref<ReturnType<typeof treeifyError<RegisterFormError>> | undefined>();
    const registrationForm = reactive<RegisterForm>({
        email: "",
        password: "",
        confirm_password: ""
    })

    const registerEmailAndPassword = async (): Promise<UserCredential | null> => {
        try {
            isLoading.value = true;
            const validated = registerSchema.parse(registrationForm);

            const data = await createUserWithEmailAndPassword(firebaseAuth!, validated.email, validated.password)

            // Redirect sa setup account
            router.push("/setup-account");
            return data;
        } catch (error) {
            if (error instanceof ZodError)
                formError.value = z.treeifyError(error as ZodError<RegisterFormError>);

            if (error instanceof FirebaseError) {
                const fireError = error as FirebaseError;

                if (fireError.code == "auth/email-already-in-use") {
                    console.log("Email already in use");
                    formError.value = {
                        errors: [],
                        properties: {
                            email: {
                                errors: [
                                    "Email already in use"
                                ]
                            }
                        }
                    };
                }
            }

        } finally {
            isLoading.value = false;
        }

        return null;
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
        formError,
        isLoading
    }

}