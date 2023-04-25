import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "./logger";

async function createTestCreds() {
  const creds = await nodemailer.createTestAccount();
  console.log("hello");
  console.log({ creds });
}

// createTestCreds();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: smtp.secure,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, "error sending mail");
    }
    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
