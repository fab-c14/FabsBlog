import dotenv from 'dotenv';
import { MailtrapClient } from 'mailtrap';

dotenv.config();  // Load environment variables from .env file

// Check if variables are being loaded
console.log('Token:', process.env.TOKEN);          // Should print your Mailtrap token
console.log('Recipient Email:', process.env.RECIPIENT_EMAIL); // Should print your recipient email

const TOKEN = process.env.TOKEN;
const SENDER_EMAIL = "hello@demomailtrap.com"; 
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

if (!TOKEN || !RECIPIENT_EMAIL) {
  console.error('Missing environment variables');
  process.exit(1); // Exit if missing
}

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };

client
  .send({
    from: sender,
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Hello from Mailtrap!",
    text: "Welcome to Mailtrap Sending!",
  })
  .then(console.log)
  .catch(console.error);
