
import { setGlobalOptions } from "firebase-functions";
import { onDocumentCreated, onDocumentUpdated, QueryDocumentSnapshot } from "firebase-functions/firestore";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import nodemailer from "nodemailer";
import { HttpsError, onCall } from "firebase-functions/https";

setGlobalOptions({ maxInstances: 10 });

initializeApp();


const db = getFirestore();
const pasword = "ioak gevy jysq kelr";

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


  const clientRef = await admin.firestore().doc("users/" + after.clientId).get();


  if (after.status == "assigned") {
    const assignment = await admin.firestore().doc("job_assignments/" + event.data.after.id).get();
    const worker = await admin.firestore().doc("user/" + assignment.id).get();

    const workerMailTemplate = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Assignment Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 20px;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #007BFF;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .button {
      background-color: #28a745;
      color: #ffffff;
      padding: 12px 20px;
      text-decoration: none;
      font-size: 16px;
      border-radius: 4px;
      display: inline-block;
      text-align: center;
    }
    .footer {
      font-size: 14px;
      color: #888;
      text-align: center;
      margin-top: 20px;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Job Assigned: Action Required
    </div>
    
    <p class="content">Hello ${worker.data().firstname},</p>
    
    <p class="content">
      A new job has been assigned to you! Below are the details of the request.
    </p>

    <div class="section-title">
      Job Request Details:
    </div>
    <p class="content">
      <strong>Job ID:</strong> ${event.data.after.id}<br>
      <strong>Client Name:</strong> ${clientRef.data().firstname + " " + clientRef.data().lastname}<br>
      <strong>Location:</strong> ${after.location.description} <br>
    </p>

    <div class="section-title">
      Contact Information:
    </div>
    <p class="content">
      <strong>Client Email:</strong> ${clientRef.data().email}<br>
    </p>

    <p class="content">
      Please confirm your availability and take the necessary steps to complete this job.
    </p>

    <p class="content">
      <a href="https://ce-project-15307.web.app/worker/job-details/${event.data.after.id}" class="button">View Job Details & Start</a>
    </p>

    <div class="footer">
      <p>Thank you for using Prodigify!</p>
      <p>If you have any questions, feel free to <a href="mailto:support@prodigify.com">contact us</a>.</p>
    </div>
  </div>
</body>
</html>

  `;

  
  let workerMailOptions = {
    from: 'staleexam19@gmail.com', // sender address
    to: worker.data().email,  // list of recipients
    subject: 'Prodigify: Status Update',
    // text: plainText,
    html: workerMailTemplate
  }


  transporter.sendMail(workerMailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent to worker: ' + info.response);
    }
  })
  }



  const clientMailTemplate = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Request Update Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 20px;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #007BFF;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .button {
      background-color: #007BFF;
      color: #ffffff;
      padding: 12px 20px;
      text-decoration: none;
      font-size: 16px;
      border-radius: 4px;
      display: inline-block;
      text-align: center;
    }
    .footer {
      font-size: 14px;
      color: #888;
      text-align: center;
      margin-top: 20px;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Job Request Update
    </div>
    
    <p class="content">Dear ${clientRef.data().firstname},</p>
    
    <p class="content">
      We wanted to let you know that there has been an update to your job/service request.
    </p>

    <div class="section-title">
      Job Request Details:
    </div>
    <p class="content">
      <strong>Job ID:</strong> ${event.data.after.id}<br>
      <strong>Status:</strong> ${after.status}
    </p>

    <div class="section-title">
      Assigned Worker:
    </div>
    <p class="content">
      <strong>Worker Name:</strong> {{worker_name}}<br>
      <strong>Worker Contact:</strong> {{worker_contact}}
    </p>

    <p class="content">
      Please visit your dashboard for more details on this request and to track its progress.
    </p>

    <p class="content">
      <a href="https://ce-project-15307.web.app/client/job-details/${event.data.after.id}" class="button">View Job Details</a>
    </p>

    <div class="footer">
      <p>Thank you for using Prodigify!</p>
      <p>For any questions, feel free to <a href="mailto:support@prodigify.com">contact us</a>.</p>
    </div>
  </div>
</body>
</html>
  `;

  let clientMailOptions = {
    from: 'staleexam19@gmail.com', // sender address
    to: clientRef.data().email,  // list of recipients
    subject: 'Prodigify: Status Update', // Subject line
    // text: plainText,
    html: clientMailTemplate
  }


  transporter.sendMail(clientMailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent to client: ' + info.response);
    }
  })

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

const generateOtp = (length = 6): string => {
  let otp = "";
  const digits = "0123456789";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
};

const OTP_COLLECTION = "userOtps";
const transporter = nodemailer.createTransport({
  service: "Gmail", // or any SMTP service
  auth: {
    user: "staleexam19@gmail.com",
    pass: pasword,
  },
});

export const sendOtp = onCall(async (data, context) => {
  const { email } = data.data;

  if (!email) {
    throw new HttpsError("invalid-argument", "Email is required.");
  }

  // Generate OTP
  const otp = generateOtp();
  const expiresAt = admin.firestore.Timestamp.fromDate(new Date(Date.now() + 5 * 60 * 1000)); // 5 min expiry

  // Store OTP in Firestore (hashed for security is better, but plaintext works for demo)
  await admin.firestore().collection(OTP_COLLECTION).doc(email).set({
    otp,
    expiresAt,
    used: false,
  });

  // Send email
  const mailOptions = {
    from: `"Prodigify" <staleexam19@gmail.com>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent" };
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    throw new HttpsError("internal", "Failed to send OTP");
  }
});


export const verifyOtp = onCall(async (data, context) => {
  const { email, otp } = data.data;

  if (!email || !otp) {
    throw new HttpsError("invalid-argument", "Email and OTP are required.");
  }

  const otpDocRef = admin.firestore().collection(OTP_COLLECTION).doc(email);
  const otpDoc = await otpDocRef.get();

  if (!otpDoc.exists) {
    throw new HttpsError("not-found", "No OTP found for this email.");
  }

  const otpData = otpDoc.data();

  if (otpData.used) {
    throw new HttpsError("failed-precondition", "OTP has already been used.");
  }

  const now = admin.firestore.Timestamp.now();
  if (otpData.expiresAt.toMillis() < now.toMillis()) {
    throw new HttpsError("deadline-exceeded", "OTP has expired.");
  }

  if (otpData.otp !== otp) {
    throw new HttpsError("invalid-argument", "Incorrect OTP.");
  }

  // Mark OTP as used
  await otpDocRef.update({ used: true });

  return { success: true, message: "OTP verified successfully." };
});