
import { setGlobalOptions } from "firebase-functions";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/firestore";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { db } from "./firestore";
import { addActivityLog } from "./utils";

setGlobalOptions({ maxInstances: 10 });

initializeApp();

export const onJobCreated = onDocumentCreated({
  document: "job_requests/{jobId}",
}, async (event) => {

  if (!event.data) return;

  const data = event.data?.data();

  if (!data) return;

  addActivityLog(data, 'create-job', "job_requests");
});

export const onJobUpdated = onDocumentUpdated("job_requests/{jobId}", async (event) => {
  const after = event.data?.after.data();

  if (!after) return;

  let logEntry: any;

  if (after.status == "in-progress")
    addActivityLog(after, 'assigned-job', "job_requests");

  if (after.status == "marked as complete")
    addActivityLog(after, 'mark-complete-job', "job_requests");


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
      id: event.data.id
    },
    date_created: admin.firestore.FieldValue.serverTimestamp()
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
        id: event.data.after.id
      }
    });
  }

});