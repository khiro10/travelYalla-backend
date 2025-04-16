/*import express from "express";
import nodemailer from "nodemailer";
import  from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Load from .env
    pass: process.env.EMAIL_PASS, // Use App Password (Don't use raw password!)
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
*/
