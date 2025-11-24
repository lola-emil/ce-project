export type PersonName = {
    firstname: string;
    middlename?: string;
    lastname: string;

    suffix?: string;
};

export type Gender = "M" | "F";


export type Address = {
    addressLine1: string;        // Primary street address or building number
    addressLine2?: string;       // Secondary address line (optional)
    city: string;                 // City or locality
    suburb?: string;              // Suburb or neighborhood (optional)
    stateProvince: string;       // State, province, or region
    zipCode: string;          // Postal or ZIP code
    country: string;              // Full country name
    country_code: string;         // 2-letter ISO country code
    latitude?: number;            // Geographic latitude (optional)
    longitude?: number;           // Geographic longitude (optional)
    formatted_address: string;    // Full address as a human-readable string
    addressType: "permanent" | "current",
}


export type ContactInfo = {
    email?: string;
    phone_number: string;
    phone_number_is_verified: boolean;
    addresses: Address[];
};


export type UserRole = "admin" | "worker" | "client";
// MGA USERS
export interface User {
    uid: string;
    email: string;

    role: UserRole; // Set via custom claims

    name?: PersonName;                    // Admin might not need this
    // gender?: Gender;

    contactInfo?: ContactInfo;           // Only for worker/client
}
