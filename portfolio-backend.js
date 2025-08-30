
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Contact form endpoint

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    console.log('Contact form submission:', { name, email, message });

    // Set up Nodemailer transporter (Gmail example)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
       auth: {
    user: 'owololagabriel@gmail.com',
    pass: 'obhas3310'
}
    });

    // Email options
    let mailOptions = {
        from: 'YOUR_GMAIL_ADDRESS@gmail.com', // Replace with your Gmail address
        to: 'owololagabriel@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Thank you for contacting me, ' + name + '! I will get back to you soon.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'There was an error sending your message. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Portfolio backend running at http://localhost:${PORT}`);
});
