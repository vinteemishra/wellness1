import { SendMailOptions, Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';




let baseurl='https://storage.cloud.google.com/tour2wellness_bucket/';



export async function sendEmail(email: string, subject: string, text: string, attachment?: string, attachmentName?: string) {
  console.log("hello",attachmentName);
  console.log(attachment);
  try {

    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    console.log("transporter", transporter);
    console.log("hmm",attachment);

    const mailOptions: SendMailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      attachments: [],
    };
    console.log("test",attachment,attachmentName,baseurl);

    if (attachment && attachmentName) {
      // const attachmentBase64 = fs.readFileSync(`${baseurl}${attachmentName}`, 'base64');



      const attachmentObject = {
        filename: `${baseurl}${attachmentName}`,
        path: `${baseurl}${attachmentName}`,
        // href: 'https://storage.cloud.google.com/tour2wellness_bucket/' + attachmentName,
        href: `https://storage.googleapis.com/tour2wellness_bucket/${attachmentName}`,



        content: attachment,
        encoding: 'base64',
        contentType: 'image/png',
      };
      mailOptions.attachments = [attachmentObject];
    }


    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.log("Email not sent to:", email);
    console.error(error.message);
  }
}
