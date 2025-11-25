import type { Timestamp } from "firebase/firestore";

type PersonName = {
    firstname: string;
    middlename?: string;
    lastname: string;

    suffix?: string;
};

type Gender = "M" | "F";


type Address = {
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


type ContactInfo = {
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

// JOBS SCHEMA
type JobStatus =
    | "pending"      // waiting for worker assignment
    | "assigned"     // worker matched or accepted
    | "in_progress"  // job currently being done
    | "completed"    // job finished successfully
    | "cancelled";

type JobLocation = {
    address: string;
    geo: {
        lat: number;
        lng: number;
    };
    notes?: string;               // e.g. "Near City Hall, blue gate"
}

type JobImage = {
    url: string;
}

interface JobRequest {
    id: string;
    clientId: string; // reference sa worker
    tags: string[];

    title: string;
    description: string;

    location: JobLocation;
    budget: number;
    status: JobStatus;

    jobImage?: JobImage[]


    createdAt: Timestamp;
    updatedAt?: Date;
}


type JobAssignmentStatus =
    | "requested"     // worker received assignment request
    | "accepted"      // worker accepted job
    | "declined"      // worker declined
    | "in_progress"
    | "completed"
    | "failed";

type Progress = {
    title: string;
    comment: string;
    date: string;
};

export interface JobAssignment {
    id: string;
    jobId: string;
    workerId: string; // Kinsay gi assignan

    assignedAt: Date; // Kanus a gi assign
    status: JobAssignmentStatus;

    progress: Progress[];

    completionPhotoUrl?: string;  // Proof of work done

    clientReview: {
        ratingFromClient?: number;    // Rating (1–5 stars)
        reviewFromClient?: string;    // Optional feedback text
    }

    earnings?: number;            // Worker’s payment amount
}


type PaymentStatus = "pending" | "paid" | "released" | "refunded";


interface Payment {
    id: string;
    jobId: string;
    clientId: string;
    workerId: string;
    amount: number;

    platformFee: number;
    totalPayout: number;

    status: PaymentStatus;

    createdAt: Date;
    updatedAt: Date;

    transactionRef?: string; // gikan sa payment gateway pareha anang GCash or Maya
}

export interface WorkerReview {
    id: string;

    reviewerId: string; // reference kay ang client
    revieweeId: string; /// reference kay ang worker

    rating: number; // 1-5 ang rate
    comment?: string;

    createdAt: Date;
}

export interface Activity {
    id: string;
    user_uid: string;

}