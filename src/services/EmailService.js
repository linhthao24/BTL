const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

dotenv.config();

const EmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
    <div>
      Put product <b>${order.name}</b> quantity <b>${order.amount}</b> price: <b>${order.price} VND</b></div>
      <div> Imagine of Product </div>
    </div>`
        attachImage.push({ path: order.image })
    })

    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT,
        to: email,
        subject: "Ordered",
        text: "Hello world?",
        html: `<div><b>Order success</b></div> ${listItem}`,
        attachments: attachImage,
    });
}

module.exports = {
    EmailCreateOrder
}