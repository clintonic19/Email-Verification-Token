
const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv');

dotenv.config()

// const TOKEN = process.env.MAILTRAP_TOKEN;
// const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN, endpoint: process.env.MAILTRAP_ENDPOINT
});

const sender = {
  email: "hello@demomailtrap.com",
  // email: "clintonictendency@gmail.com",
  name: "Tubomina",
};

// const recipients = [
//   {
//     email: "clintonictendency@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

module.exports = {client, sender};