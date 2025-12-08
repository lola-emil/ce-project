
import { setGlobalOptions } from "firebase-functions";
import { onDocumentCreated, onDocumentUpdated, QueryDocumentSnapshot } from "firebase-functions/firestore";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import nodemailer from "nodemailer";

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

export const onJobUpdated = onDocumentUpdated({
  document: "job_requests/{jobId}",
  region: "europe-west1"

}, async (event) => {
  if (!event.data) return;
  const after = event.data?.after.data();

  if (!after) return;

  if (after.status == "in-progress") {
    await addActivityLog(event.data.after, "assigned-job", "job_requests");
  }

  if (after.status == "marked as complete") {
    await addActivityLog(event.data.after, "mark-complete-job", "job_requests");
  }

  if (after.status == "completed") {
    const logEntry = {
      for_user: after.clientId,
      action_type: "assigned-job",
      data: {
        collection: "job_assignments",
        id: event.data.after.id,
      },
      date_created: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("activity_logs").add(logEntry);

    console.log("Activity log created:", logEntry);


    const result = await db.collection("earnings").add({
      amount: after.budget,
      addedDate: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("Added earnings", result.id);
  }


  // await db.collection("activityLogs").add(logEntry);
  // console.log("Activity log created:", logEntry);
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


export const onUserCreated = onDocumentCreated({
  document: "users/{userId}",
}, (event) => {

  if (!event.data) return;

  const data = event.data.data();

  if (!data) return;

  if (data.role == "worker") {
    const pasword = "ioak gevy jysq kelr";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "staleexam19@gmail.com",
        pass: pasword,
      },
    });

    const plainText = `
      Subject: Your Temporary Account Credentials

      Hello,

      We’ve created a temporary account for you. Use the credentials below to log in, and make sure to change your password after your first login.

      Email: ${data.email}
      Password: ${data.tempPassword}

      You can log in here:
      https://ce-project-15307.web.app/login

      If you did not request this account, please ignore this email.

      Thank you,
      The Team

      © 2025 Prodigify. All rights reserved.
    `;

    let mailOptions = {
      from: 'staleexam19@gmail.com', // sender address
      to: data.email,  // list of recipients
      subject: 'Prodigify Temporary Account Credentials', // Subject line
      text: plainText,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Temporary Credentials</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #f59e0b;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
          }
          .credentials {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            font-family: monospace;
            font-size: 18px;
            text-align: center;
            word-break: break-all;
          }
          .button {
            display: inline-block;
            background-color: #f59e0b;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            margin-top: 10px;
            font-weight: bold;
          }
          .footer {
            font-size: 12px;
            color: #777777;
            text-align: center;
            padding: 15px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">Your Temporary Account Credentials</div>
          <div class="content">
            <p>Hello,</p>
            <p>We’ve created a temporary account for you. Use the credentials below to log in, and make sure to change your password after your first login.</p>
            
            <div class="credentials">
              Email: <strong>${data.email}</strong><br>
              Password: <strong>${data.tempPassword}</strong>
            </div>

            <p>You can log in here:</p>
            <a class="button" href="https://ce-project-15307.web.app/login">Login to Your Account</a>

            <p>If you did not request this account, please ignore this email.</p>
            <p>Thank you,<br>The Team</p>
          </div>
          <div class="footer">
            &copy; 2025 Prodigify. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      ` // HTML body
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
  }
})