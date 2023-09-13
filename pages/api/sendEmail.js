import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'ldnrecruits@gmail.com',
          pass: 'qahqeshhjubfnsge',
        },
      });

      await transporter.sendMail({
        from: email,
        to: 'ldnelson16@gmail.com', // Replace with your email address
        subject,
        text: `${name} (${email}) says: ${message}`,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).end();
  }
}