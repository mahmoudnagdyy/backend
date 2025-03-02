import nodemailer from 'nodemailer'


const sendEmail = async ({from = process.env.EMAIL, to, cc, bcc, attachments = [], subject, text, html} = {}) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
    });
    
    const info = await transporter.sendMail({
        from: `Verify Email <${from}>`,
        to,
        cc,
        bcc,
        attachments,
        subject,
        text,
        html
    });
}

export default sendEmail