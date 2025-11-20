export type UserRole = "admin" | "worker" | "client";
export type ActivityStatus = "online" | "offline";
export type UserStatus = "active" | "inactive" | "suspended";
export type AvailabilityStatus = "available" | "unavailable";

export type Address = {
    street: string
    locality: string
    region: string;
    postalCode: string;
    country: string;
    addressType: "permanent" | "current"
};


export interface User {
    id: string;

    profileImageUrl?: string;

    firstname: string;
    middlename?: string;
    lastname: string;

    email: string;

    address: Address[]

    fullAddress: string;

    telephone: string;

    userRole: UserRole;

    activityStatus: ActivityStatus;
    availability?: AvailabilityStatus;
}