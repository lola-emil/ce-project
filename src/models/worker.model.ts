
export interface WorkerReview {
    id: string;

    reviewerId: string; // reference kay ang client
    revieweeId: string; /// reference kay ang worker

    rating: number; // 1-5 ang rate
    comment?: string;

    createdAt: Date;
}