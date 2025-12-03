
import { setGlobalOptions } from "firebase-functions";
import { onDocumentCreated, onDocumentUpdated, QueryDocumentSnapshot } from "firebase-functions/firestore";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";


setGlobalOptions({ maxInstances: 10 });

initializeApp();
const db = getFirestore();
type Actions =
  | "create-job"
  | "cancel-job"
  | "accept-job"
  | "add-progress"
  | "mark-complete-job"
  | "approve-job-completion"
  | "assigned-job"
  ;

async function addActivityLog(data: QueryDocumentSnapshot, actionType: Actions, collection: string) {
  const logEntry = {
    for_user: data.data().clientId,
    action_type: actionType,
    date_created: admin.firestore.FieldValue.serverTimestamp(),
    data: {
      collection: collection,
      id: data.id,
    },
  };


  await db.collection("activity_logs").add(logEntry);
  console.log("Activity log created:", logEntry);
}
export const onJobCreated = onDocumentCreated({
  document: "job_requests/{jobId}",
   region: "europe-west1"
}, async (event) => {
  if (!event.data) return;

  const data = event.data?.data();

  if (!data) return;

  await addActivityLog(event.data, "create-job", "job_requests");
});

type shit = unknown;

export const onJobUpdated = onDocumentUpdated({
  document: "job_requests/{jobId}", 
   region: "europe-west1"

}, async (event) => {
  if (!event.data) return;
  const after = event.data?.after.data();

  if (!after) return;

  let logEntry: shit;

  if (after.status == "in-progress") {
    await addActivityLog(event.data.after, "assigned-job", "job_requests");
  }

  if (after.status == "marked as complete") {
    await addActivityLog(event.data.after, "mark-complete-job", "job_requests");
  }


  await db.collection("activityLogs").add(logEntry);
  console.log("Activity log created:", logEntry);
});

export const onJobAssignmentCreated = onDocumentCreated({
  document: "job_assignments/{jobId}",
}, async (event) => {
  if (!event.data) return;

  const data = event.data.data();

  const logEntry = {
    for_user: data.workerId,
    action_type: "assigned-job",
    data: {
      collection: "job_assignments",
      id: event.data.id,
    },
    date_created: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection("activity_logs").add(logEntry);

  console.log("Activity log created:", logEntry);
});

export const onJobAssignmentUpdated = onDocumentUpdated("job_assignments/{jobId}", async (event) => {
  if (!event.data) return;

  const before = event.data.before.data();
  const after = event.data.after.data();

  if (!before || !after) return;

  if (after.status == "accepted") {
    await db.collection("activity_logs").add({
      for_user: after.workerId,
      action_type: "accept-job",
      date_created: admin.firestore.FieldValue.serverTimestamp(),
      data: {
        collection: "job_assignments",
        id: event.data.after.id,
      },
    });
  }
});