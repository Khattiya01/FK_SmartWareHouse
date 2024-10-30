import 'dotenv/config';
import {
	MailerSend,
	EmailParams,
	Sender,
	Recipient
} from "mailersend";

export const SendMail = ({ email }: { email: string }) => {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY ?? "mlsn.7142ab64a2f339b458ff112880d74c3f7c5554b9e75ba13bf5b042b69d74d276",
    });

    const sentFrom = new Sender("khattiya.b.game@gmail.com", "Bob");

    const recipients = [new Recipient(email, "Pam")];

    const personalization = [
      {
        email: email,
        data: {
          name: email,
        },
      },
    ];

    const htmlContent = `
        <p>Hi email {{name}}.</p>
        <p>We wanted to remind you that your free trial will expire in 3 days.</p>
        <p>If you like what you see and would like to continue using Your Business, you can purchase a Premium plan by clicking Upgrade in your dashboard.</p>
        <p>If you choose not to upgrade, you’ll lose access to premium features and your data, which will be permanently deleted after 30 days.</p>
        <br>
        <p>Regards,</p>
        <p>The Your Business Team</p> `;

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setPersonalization(personalization)
      .setSubject("{{name}}, your free trial is about to expire.")
      .setHtml(htmlContent)
      .setText(
        "Hi {{name}}. We wanted to remind you that your free trial will expire in 3 days. If you like what you see and would like to continue using Your Business, you can purchase a Premium plan by clicking Upgrade in your dashboard. If you choose not to upgrade, you’ll lose access to premium features and your data, which will be permanently deleted after 30 days. Regards, The Your Business Team"
      );

    mailerSend.email
      .send(emailParams)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });



  // // Create a transporter object using SMTP transport
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "khattiya.b.game@gmail.com",
  //     pass: "nodemailer",
  //   },
  // });

  // // Setup email data 
  // const mailOptions = {
  //   from: '"Bob" <khattiya.b.game@gmail.com>', // sender address
  //   to: email, // list of receivers
  //   subject: "Welcome! Your free trial is ready.", // Subject line
  //   text: "Hey there! Welcome to Your Business, we're happy to have you here! You'll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing. Remember to check out our guides and contact support if you need anything. Regards, The Your Business Team", // plain text body
  //   html: `
  //   <p>Hey there!</p>
  //   <p>Welcome to Your Business, we're happy to have you here!</p>
  //   <p>You'll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing.</p>
  //   <p>Remember to check out our guides and contact support if you need anything.</p>
  //   <br>
  //   <p>Regards,</p>
  //   <p>The Your Business Team</p>
  // `, // html body
  // };

  // // Send email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log("Message sent: %s", info.messageId);
  // });
};
