
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


// ===============================
// 🧰 Job Request Schema
// ===============================
// Created by client; posted to the pool for matching workers

export type JobStatus =
  | "pending"      // waiting for worker assignment
  | "assigned"     // worker matched or accepted
  | "in_progress"  // job currently being done
  | "completed"    // job finished successfully
  | "cancelled";   // cancelled by client or admin

export interface JobRequest {
  id: string;
  clientId: string;             // Ref: User.id (role=client)
  categoryId: string;           // Ref: JobCategory.id
  title: string;                // Short title (e.g., "Repair broken gate")
  description: string;          // Full job description
  location: JobLocation;        // Where job will take place
  budget: number;               // Estimated cost
  status: JobStatus;            // Current job state
  createdAt: Date;
  updatedAt: Date;

  // Optional fields
  assignedWorkerId?: string;    // Ref: User.id (role=worker)
  startTime?: Date;
  endTime?: Date;
  photos?: string[];            // Images uploaded by client
}

// ===============================
// 📍 Job Location Schema
// ===============================

export interface JobLocation {
  address: string;
  lat: number;
  lng: number;
  notes?: string;               // e.g. "Near City Hall, blue gate"
}


// ===============================
// 🔄 Job Assignment Schema
// ===============================
// Tracks worker assignment, progress, and completion details.

export type JobAssignmentStatus =
  | "requested"     // worker received assignment request
  | "accepted"      // worker accepted job
  | "declined"      // worker declined
  | "in_progress"
  | "completed"
  | "failed";

export interface JobAssignment {
  id: string;
  jobId: string;                // Ref: JobRequest.id
  workerId: string;             // Ref: User.id (role=worker)
  assignedAt: Date;             // Timestamp
  status: JobAssignmentStatus;  // State of worker’s engagement
  progressNotes?: string;       // Optional text updates
  completionPhotoUrl?: string;  // Proof of work done
  ratingFromClient?: number;    // Rating (1–5 stars)
  reviewFromClient?: string;    // Optional feedback text
  earnings?: number;            // Worker’s payment amount
}


// ===============================
// 💸 Payment Schema
// ===============================
// Records transactions between client, worker, and platform.

export type PaymentStatus = "pending" | "paid" | "released" | "refunded";

export interface Payment {
  id: string;
  jobId: string;                // Linked to JobRequest
  clientId: string;
  workerId: string;
  amount: number;
  platformFee: number;          // Commission (e.g., 10–15%)
  totalPayout: number;          // Amount sent to worker
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  transactionRef?: string;      // Reference from payment gateway
}


// ===============================
// 🗣️ Review Schema
// ===============================
// Optional: for future use (client ↔ worker reviews)

export interface Review {
  id: string;
  jobId: string;
  reviewerId: string;           // User who gave the review
  revieweeId: string;           // User being reviewed
  rating: number;               // 1–5
  comment?: string;             // Optional message
  createdAt: Date;
}
