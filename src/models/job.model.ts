// JOBS SCHEMA
export type JobStatus =
    | "pending"      // waiting for worker assignment
    | "assigned"     // worker matched or accepted
    | "in_progress"  // job currently being done
    | "completed"    // job finished successfully
    | "cancelled";

export type JobLocation = {
    address: string;
    lat: number;
    lng: number;
    notes?: string;               // e.g. "Near City Hall, blue gate"
}

export type JobImage = {
    url: string;
}

export interface JobRequest {
    id: string;
    clientId: string; // reference sa worker
    tags: string[];

    title: string;
    description: string;

    location: JobLocation;
    budget: number;
    status: JobStatus;

    jobImage?: JobImage[]


    createdAt: Date;
    updatedAt: Date;
}


export type JobAssignmentStatus =
    | "requested"     // worker received assignment request
    | "accepted"      // worker accepted job
    | "declined"      // worker declined
    | "in_progress"
    | "completed"
    | "failed";

export type Progress = {
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
