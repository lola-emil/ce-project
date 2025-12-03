import admin from "firebase-admin";
import { db } from "./firestore";

export type Actions = 
| "create-job"
| "cancel-job"
| "accept-job"
| "add-progress"
| "mark-complete-job"
| "approve-job-completion"
| "assigned-job"
;

export async function addActivityLog(data: admin.firestore.DocumentData, actionType: Actions, collection: string) {
    const logEntry = {
        for_user: data.clientId,
        action_type: actionType,
        date_created: admin.firestore.FieldValue.serverTimestamp(),
        data: {
            collection: collection,
            id: data.id
        }
    };

    await db.collection("activity_logs").add(logEntry);
    console.log("Activity log created:", logEntry);
}