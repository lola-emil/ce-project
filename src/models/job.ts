
export interface JobCategory {
  id: string;
  name: string;                 // e.g. "Carpentry"
  description?: string;         // Optional short description
  iconUrl?: string;             // Optional icon for UI
  isActive: boolean;            // For filtering visible categories
}


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

export interface JobLocation {
  address: string;
  lat: number;
  lng: number;
  notes?: string;               // e.g. "Near City Hall, blue gate"
}