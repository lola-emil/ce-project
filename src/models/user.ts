export type Address = {
    street: string
    locality: string
    region: string;
    postalCode: string;
    country: string;
    addressType: "permanent" | "current"
};



export type UserRole = "admin" | "user" | "client";
export type ActivityStatus = "online" | "offline";
export type UserStatus = "active" | "inactive" | "suspended";
export type AvailabilityStatus = "available" | "unavailable";


export interface User {
    id: string;

    profileImageUrl?: string;

    firstname: string;
    middlename?: string;
    lastname: string;

    email: string;
    passwordHash?: string;

    address: Address[]

    fullAddress: string;

    telephone: string;

    userRole: UserRole;

    activityStatus: ActivityStatus;
    availability?: AvailabilityStatus;
}