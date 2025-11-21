/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { CallableRequest, onCall, onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import admin, { initializeApp } from "firebase-admin";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

initializeApp();
const auth = admin.auth();


type SetUserRoleRequest = {
  uid: string;
  role: "app" | "client" | "worker" | "admin";
};


export const helloWorld = onRequest((_request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// USER ROLE FUNCTIONS
export const setUserRoleFunction = onCall<SetUserRoleRequest>(
  async (data: CallableRequest<SetUserRoleRequest>) => {

    const { uid, role } = data.data; // <- note the `.data` here

    if (!["app", "client", "worker", "admin"].includes(role)) {
      throw new Error("Invalid role");
    }

    await auth.setCustomUserClaims(uid, { role });

    return { message: `Role ${role} set for user ${uid}` };
  }
);


export async function setUserRole(uid: string, role: string) {
  if (!["app", "client", "worker", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  await auth.setCustomUserClaims(uid, { role });
  console.log(`Set role ${role} for user ${uid}`);
}
