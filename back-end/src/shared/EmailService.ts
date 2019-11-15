import newUserTemplate from "./emailTemplates/newUser.html";
import newPasswordTemplate from "./emailTemplates/newPassword.html";
import userDeletedTemplate from "./emailTemplates/userDeleted.html";
import Mustache = require("mustache");

const emailServiceEnabled = JSON.parse(process.env.SEND_EMAILS!);

const definePostmarkClient = () => {
  if (emailServiceEnabled) {
    return new postmark.ServerClient(process.env.POSTMARK_API_KEY);
  }
  return null;
};

const postmark = require("postmark");
const client = definePostmarkClient();

export const sendNewUserEmail = (email: string, verificationHash: string) => {
  if (emailServiceEnabled) {
    let content = {
      link:
        "http://" +
        process.env.REACT_APP_BASE_ADDRESS +
        "login?hash=" +
        verificationHash
    };

    let renderedContent = Mustache.render(newUserTemplate, content);
    client.sendEmail({
      From: process.env.POSTMARK_EMAIL_FROM,
      To: email,
      Subject: "Welcome / Tere tulemast",
      HtmlBody: renderedContent
    });
  }
};

export const sendNewPasswordEmail = (email: string, password: string) => {
  if (emailServiceEnabled) {
    let content = {
      password: password
    };

    let renderedContent = Mustache.render(newPasswordTemplate, content);
    client.sendEmail({
      From: process.env.POSTMARK_EMAIL_FROM,
      To: email,
      Subject: "New Password / Uus salasõna",
      HtmlBody: renderedContent
    });
  }
};

export const sendDeletedEmail = (email: string) => {
  if (emailServiceEnabled) {
    client.sendEmail({
      From: process.env.POSTMARK_EMAIL_FROM,
      To: email,
      Subject: "Account deleted / Konto kustutatud",
      HtmlBody: userDeletedTemplate
    });
  }
};
