
import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";


setGlobalOptions({ maxInstances: 10 });
initializeApp();
const db = getFirestore();


export const helloWorld = onRequest((_request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});


export const onJobCreated = onDocumentCreated("job_requests/{jobId}", async (event) => {
  const data = event.data?.data();
  console.log("Data:", data);


  const logEntry = {
    type: "created",
    data,
    timestamp: Date.now()
  };

  await db.collection("activityLogs").add(logEntry);

  console.log("Activity log created:", logEntry);
})

export const onJobUpdated = onDocumentUpdated("job_requests/{jobId}", async (event) => {
  const before = event.data?.before.data();  // QueryDocumentSnapshot → data()
  const after = event.data?.after.data();

  console.log("Before:", before);
  console.log("After:", after);


  const logEntry = {
    type: "update",
    after,
    timestamp: Date.now()
  };

  await db.collection("activityLogs").add(logEntry);

  console.log("Activity log created:", logEntry);
});