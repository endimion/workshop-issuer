"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();
const constants = require("../utils/consts_backend")


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: constants.EMAIL_USER,
    pass: constants.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendInvitationEmail(
  recipientEmail,
  acceptLink,
) {
  console.log(
    `sending email to ${recipientEmail} with ${acceptLink}  `
  );
  await transporter.sendMail({
    from: "UAegean-myIDs@i4mlabUAegean.onmicrosoft.com", // sender address
    to: recipientEmail, // list of receivers
    subject: "The Issuance of your KYB Verifiable Credential is ready! ✔", // Subject line
    text: "This is an automated email ", // plain text body
    html: `<h3>You can now issue your KYB Verifiable Credential</h3> 
    <div  style="margin-Top: 3rem"> Thank you for registering your Organization to the public registry!</div>
    <div> You can now issue a Digital Identity Card as a 
    Verifiable Credential containing your KYB profile (Natural person and Organization details)  </div>
    <div  style="margin-Top: 3rem"> To do so use the following link </div>
    <div style="margin-Top: 3rem">
    Please click ${acceptLink} to proceed to the issuance of your KYB Digital Identity Card.
    </div>`,
  });
}
 
module.exports = {
  sendInvitationEmail,
};
