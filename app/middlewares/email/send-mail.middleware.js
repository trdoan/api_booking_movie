const createHttpError = require("http-errors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const sendEmail = async (req, res, next) => {
  console.log(process.env.GMAIL_ACC, process.env.GMAIL_PASS);
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  try {
    const { email } = req.body;
    const { password: string } = req;
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${process.env.GMAIL_ACC}`, // sender address
      to: email, // list of receivers
      subject: "ĐẶT LẠI MẬT KHẨU TỪ UTH", // Subject line
      text: `Mật khẩu mới: ${string}`, // plain text body
    });
    res.send("Đặt lại mật khẩu thành công");
  } catch (error) {
    console.log(error);
    res.send(error);
    // next(createHttpError.InternalServerError);
  }
};

module.exports = {
  sendEmail,
};
