

export type PaymentStatus = "pending" | "paid" | "released" | "refunded";


export interface Payment {
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
