import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { escape } from "html-escaper";
dotenv.config();
/**
 * Send an email to a user
 * @param {string} username - username of the mail server
 * @param {string} password - password of the mail server
 * @param {string} from -  where the mail is coming from
 * @param {string} to -  to where the mail is coming from
 * @param {string} subject -  the subject of the email
 * @param {string} name - property name of sender of email
 * @param {string} format -  format of the message i.e html or text
 * @param {string} html - the content of the message in html format
 * @param {string} text - the content of the message in text format
 * @returns a boolean promise
 */
export function sendMail(
    email: string,
    subject: string,
    format: string = 'html',
    name: string,
    html?: string,
    text?: string,
){

    try {
        var transporter = nodemailer.createTransport({
            host: 'mail.mujaware.com',//gmail
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        var mailOptions2 = {
            envelope: {
                from: 'aliyubello@mujaware.com',
                to: `${email}`
            },
            raw: `From: aliyubello@mujaware.com
            To:${email}
            Subject:${subject}

            ${text}`
        };

        var mailOptions = {
            // from: `${process.env.USER}, {name:"Aliyu Bello",address:${process.env.USER}}`,
            from: `${name ? name : "Homes4U"} <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            [format]: html ? html : text // or html:<html>It is easy</html>
        };

        let promise = new Promise((resolve, reject) => {

            transporter.sendMail(mailOptions, function (error: any, info: any) {
                if (error) {
                    console.log(error);
                    resolve(false)
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true)
                }

            });
        });

        return promise;
    } catch (error) {
        console.warn(error);
    }

}



/**
 * Send email to users
 * 
 * @param {string } username username of the mail server
 * @param {string} password password of the mail server
 * @param {string} from where the mail is coming from
 * @param {string} to to where the mail is coming from
 * @param {string} subject the subject of the email 
 * @param {string} senderName name of sender of email
 * @param {string} format format of the message i.e html or text
 * @param {string} messageHtml the content of the message in html format
 * @param {string} messageText the content of the message in text format
 * 
 * @returns result, a json string
 */

function sendMultipleMail(
    email:string,
    subject:string,
    format:string = 'html',
    messageHtml:string,
    messageText:string,
    senderName:string,
    ccList:string,
    bccList:string,
) {

    const emaile = escape(email);
    const subjecte = escape(subject);
    const htmle = escape(messageHtml);
    const texte = escape(messageText);
    const namee = escape(senderName);

    var transporter = nodemailer.createTransport({
        host: 'mail.mujaware.com',//gmail
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    var mailOptions = {
        from: `${namee ? namee : "Kulwek"} <${process.env.USER}>`,
        cc: [ccList ? ccList : ''],
        bcc: [bccList ? bccList : ''],
        to: emaile,
        subject: subjecte,
        [format]: htmle ? htmle : texte // or html:<html>It is easy</html>
    };

    let promise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true)
            }
        });
    })

    return promise;
}

export {sendMultipleMail };

const ADDRESS_OBJECT_FORMAT=
    `
{
        name: 'Майлер, Ноде',
        address: 'foobar@example.com'
},

to: 'foobar@example.com, "Ноде Майлер" <bar@example.com>, "Name, User" <baz@example.com>',
    
cc: [
    'foobar@example.com',
    '"Ноде Майлер" <bar@example.com>,
    "Name, User" <baz@example.com>'
],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        bcvxz

bcc: [
    'foobar@example.com',
    {
        name: 'Майлер, Ноде',
        address: 'foobar@example.com'
    }
]
`;