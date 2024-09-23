const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let otpStore = {};

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const contactSchema = new mongoose.Schema({
  category: String,
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/get-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  otpStore[email] = { otp, timestamp: Date.now() };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('OTP sent to your email!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending OTP. Please try again later.');
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password, otp } = req.body;

  const otpEntry = otpStore[email];
  if (!otpEntry || otpEntry.otp !== otp || Date.now() - otpEntry.timestamp > 30000) {
    return res.status(401).send('Invalid or expired OTP.');
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    delete otpStore[email];

    res.status(201).send('Signup successful!');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Error during signup. Please try again later.');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Incorrect password.');
    }

    res.status(200).send('Login successful!');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login. Please try again later.');
  }
});

app.post('/api/contact', async (req, res) => {
  const { category, name, email, message } = req.body;

  if (!category || !name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newContact = new Contact({ category, name, email, message });
  await newContact.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `Category: ${category}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});
