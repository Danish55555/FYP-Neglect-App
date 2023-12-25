const nodemailer=require('nodemailer');
const {google}=require('googleapis');

const {OAuth2}=google.auth;
const OAUTH_PLAYGROUND='https://developers.google.com/oauthplayground';
const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
}=process.env;
const oauth2Client=new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)
//Send mail
const sendEmail=(to,url,txt)=>{
oauth2Client.setCredentials(
    {
        refresh_token:MAILING_SERVICE_REFRESH_TOKEN
    }
)
const access_token= oauth2Client.getAccessToken();
const smtpTransport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:SENDER_EMAIL_ADDRESS,
        clientId:MAILING_SERVICE_CLIENT_ID,
        clientSecret:MAILING_SERVICE_CLIENT_SECRET,
        refreshToken:MAILING_SERVICE_REFRESH_TOKEN,
        accessToken:access_token
    }
})
const mailOptions={
    from:SENDER_EMAIL_ADDRESS,
    to:to,
    subject:'Mail from Danish',
    html:`<div>
    <h2>Welcome to Neglect App </h2>
    <p> you are almost here click the button below</p>
    <a href=${url} style="background:crimson; padding:10px">${txt}</a>
    <p> If button not work click here on link</p>
    <div>${url}</div>
    </div>`
}
smtpTransport.sendMail(mailOptions,(err,infor)=>{
if(err) return err.message;
return infor;
})
}
module.exports=sendEmail;