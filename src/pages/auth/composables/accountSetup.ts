import { db } from "@/firebase";
import type { User } from "@/models/user.model";
import { useAuthStore } from "@/stores/authStore";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { reactive } from "vue";
import { useCurrentUser } from "vuefire";
import z, { ZodError } from "zod";


export type NameForm = {
    firstname: string,
    middlename?: string,
    lastname: string,
    suffix?: string
}

export type NameFormErrors = {
    firstname: string[],
    middlename: string[],
    lastname: string[],
    suffix: string[]
}

export type ContactInfoForm = {
    phoneNumber: string
    email: string
}

export type AddressForm = {
    addressLine1: string,
    addressLine2?: string,
    city: string,
    province: string,
    zipCode: string
}

export function useAccountSetup() {
    const user = useCurrentUser();
    const authStore = useAuthStore();

    const nameForm = reactive({
        firstname: "",
        middlename: "",
        lastname: "",
        suffix: ""
    });

    const validateName = () => {
        const firstStepSchema = z.object({
            firstname: z.string().min(1, { message: "First name is required" }),
            middlename: z.string().optional(),
            lastname: z.string().min(1, { message: "Last name is required" }),
            suffix: z.string().optional()
        });

        try {   
            const validated = firstStepSchema.parse(nameForm);

            return {
                success: true,
                result: validated
            }
        } catch (error) {
            return {
                success: false,
                result: z.treeifyError(error as ZodError<NameForm>)
            }
        }
    }


    const contactInfoForm = reactive({
        phoneNumber: "",
        email:""
    });


    const validateContactInfo = () => {
        const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{5,15}$/;
        const secondStepSchema = z.object({
            phoneNumber: z.string()
                .min(1, { message: "Phone number is required" })
                .regex(phoneRegex, { message: "Invalid phone number format" }),
            // email: z
            //     .email({ message: "Invalid email format" })
            //     .optional()  // Allows undefined
            //     .refine(val => val === undefined || val === "" || val.trim() !== "", {
            //         message: "Email cannot be just spaces"
            //     })
        });

        try {
            const validated = secondStepSchema.parse(contactInfoForm);
            return {
                success: true,
                result: validated
            }
        } catch (error) {
            return {
                success: false,
                result: z.treeifyError(error as ZodError<ContactInfoForm>)
            }
        }
    }

    const addressForm = reactive({
        addressLine1: "",
        addressLine2: "",
        city: "",
        province: "",
        zipCode: ""
    });

    const validateAddress = () => {

        const thirdStepSchema = z.object({
            addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
            addressLine2: z.string().optional(),
            city: z.string().min(1, { message: "City is required" }),
            province: z.string().min(1, { message: "Province is required" }),
            zipCode: z.string()
                .min(1, { message: "Zip code is required" })
        });

        try {
            const validated = thirdStepSchema.parse(addressForm);
            return {
                success: true,
                result: validated
            }
        } catch (error) {
            return {
                success: false,
                result: z.treeifyError(error as ZodError<AddressForm>)
            }
        }
    }


    const setUpAccount = async () => {
        try {

            const userId = user.value!.uid;
            const userDocRef = doc(db, "users", userId);

            const data = {
                uid: userId,
                email: contactInfoForm.email,
                role: "client",

                name: nameForm,
                contactInfo: contactInfoForm,
                address: [
                    {
                        ...addressForm
                    }
                ],

                createdAt: serverTimestamp(),
            };

            await setDoc(userDocRef, data);

            const snapshot = await getDoc(userDocRef);

            if (snapshot.exists()) {
                authStore.setUserData(snapshot.data() as User | null);
            }

            return userId;
        } catch (error) {
            console.error("Error setting up account: ", error);
            throw error;
        }
    }


    return {
        validateName,
        validateContactInfo,
        validateAddress,

        setUpAccount,

        nameForm,
        contactInfoForm,
        addressForm
    }
}