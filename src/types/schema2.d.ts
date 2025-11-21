type PersonName = {
    firstname: string;
    middlename?: string;
    lastname: string;

    suffix: string;
};

type Gender = "M" | "F";

type Address = {
    street: string
    locality: string
    region: string;
    postalCode: string;
    country: string;

    addressType: "permanent" | "current",
    addresslabel: string;
};

type ContactInfo = {
    email?: string;
    phone_number: string;
    phone_number_is_verified: boolean;
    addresses: Address[];
};

// MGA USERS
interface User {
    uid: string;
    email: string;

    role: "admin" | "worker" | "client"; // Set via custom claims

    name?: PersonName;                    // Admin might not need this
    gender?: Gender;

    contact_info?: ContactInfo;           // Only for worker/client
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
    lat: number;
    lng: number;
    notes?: string;               // e.g. "Near City Hall, blue gate"
}

interface JobRequest {
    id: string;
    clientId: string; // reference sa worker
    categoryId: string;

    title: string;
    description: string;

    location: JobLocation;
    budget: number;
    status: JobStatus;
    createdAt: Date;
    updatedAt: Date;
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

interface JobAssignmentStatus {
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