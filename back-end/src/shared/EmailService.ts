import newUserTemplate from "./emailTemplates/newUser.html";
import Mustache = require("mustache");

const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export const sendNewUserEmail = (email: string, verificationHash: string) => {
  let content = {
    link:
      "http://" + process.env.REACT_APP_BASE_ADDRESS + "?hash=" + verificationHash
  };

//   let renderedContent = Mustache.render(newUserTemplate, content);
//   client.sendEmail({
//     From: process.env.POSTMARK_EMAIL_FROM,
//     To: email,
//     Subject: "Test",
//     TextBody: renderedContent
//   });
};
