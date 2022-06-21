
import nodemailer from "nodemailer";

// send mail
export const sendEmail = (to, url, txt) => {
  const smtp = nodemailer.createTransport({
  host: "contentgizmo.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
    user: "mailto:contentgizmo@contentgizmo.com",
    pass: "xxxx"
    },
  });

  smtp.sendMail({
    to: to,
    from: "mailto:contentgizmo@contentgizmo.com",
    subject: "Contentgizmo Registration",
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to ContentGizmo.</h2>
    <p>Congratulations! You're almost set to start using ContentGizmo.
        Just click the button below to validate your email address.
    </p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
  
    <p>If the button doesn't work for any reason, you can also click on the link below:</p>
  
    <div>${url}</div>
    </div>
  `,
  });
};