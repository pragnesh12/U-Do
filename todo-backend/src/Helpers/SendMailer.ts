import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "workingpragnesh@gmail.com",
    pass: "udddneameihvvxzm",
  },
})

type MailSchema = {
  to:string,
  subject:string,
  text:string,
  html:string,
}

// async..await is not allowed in global scope, must use a wrapper
async function SendMail( to:string, subject:string, text:string, html:string ) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "workingpragnesh@gmail.com", // sender address
    to, // list of receivers
    subject,
    text,
    html,
  });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export default SendMail;