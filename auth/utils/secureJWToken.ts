import dotenv from "dotenv";
dotenv.config();

function securedToken(
    initialToken:string
) {
    try {
        const splitToken = initialToken.split('.');
        const tokenEndPart = splitToken[splitToken.length - 1];
        const secretPart = process.env.TOKEN_SECRET_PART as unknown as string;
        const finalToken = tokenEndPart.concat(secretPart);

        return finalToken;
    } catch (error) {
        console.warn(error);
    }

}

function decodeSecuredToken(
    paddedToken:string
) {
    try {
        const secretPart = process.env.TOKEN_SECRET_PART as unknown as string;
        const requiredPartLength = paddedToken.length - secretPart.length;
        const realToken = paddedToken.slice(0, requiredPartLength);

        return realToken;
    } catch (error) {
        console.warn(error);
    }
}

export{
    securedToken,
    decodeSecuredToken
}