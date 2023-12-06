const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = 3000;
// Middleware to parse JSON
app.use(cors())
app.use(express.json());

// Define a route
app.post('/sendemail', (req, res) => {
    const {name,email}=req.body
  // Replace these values with your email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  }); 

  // Email options
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: 'Hello from Nodemailer',
    text: `Hello ${name}, this is a test email from Nodemailer!`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(`Error: ${error.message}`+"my error in backend");
    }
    res.send('Email sent: ' + info.response);
  });
});

app.get("/", (req, res) => {
    res.send("welcome backend application to send emails");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


