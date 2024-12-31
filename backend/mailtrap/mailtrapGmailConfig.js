const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "6fb0d643e5f81195949974fb8ad07326";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  "clintonictendency@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);