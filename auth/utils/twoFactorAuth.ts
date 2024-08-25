import QRCode from "qrcode";
import * as speakeasy from "speakeasy";

const user: any = { secret: undefined }

export function getSpeakeasySecret() {
    var secret = speakeasy.generateSecret({ length: 20 });
    user.secret = secret; // or save in user account i.e. db
    return secret;
}

export function generateSpeakeasyToken() {
    let secret = getSpeakeasySecret();
    var token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });

    return token;
}

export function verifySpeakeasyToken(userToken: string) {
    var tokenValidates = speakeasy.totp.verify({
        secret: user.secret.base32,
        encoding: 'base32',
        token: userToken,
        window: 6
    });

    return tokenValidates;
}


export function qrCodeDataURL(secret: any):Promise<unknown> {
    // Get the data URL of the authenticator URL
    // await QRCode.toDataURL(secret.otpauth_url);
    const qrCodeDataURLPromise = new Promise((resolve, reject) =>{
        QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
            if (err) {
                console.warn(err);
                reject("Error!");
            } else {
                // Display this data URL to the user in an <img> tag
                console.log(data_url);
                resolve(data_url);
            }
        });
    });
    return qrCodeDataURLPromise;
}
