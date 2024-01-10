import { SendMailOptions, Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
// let baseurl='https://storage.cloud.google.com/tour2wellness_bucket/';



export async function sendEmail(email: string, subject: string, text: string, attachment?: Buffer, attachmentName?: string) {
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

    if (attachment && attachmentName) {


      const attachmentObject = {
        filename: attachmentName,
        // path: `${baseurl}/${attachmentName}`,
        href: attachmentName,

        content: attachmentName,
        encoding: 'base64', // Specify the encoding
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
