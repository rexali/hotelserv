import dotenv from "dotenv";
dotenv.config();

function padToken(initialToken: string): string | undefined {
    try {
        // const splitToken = initialToken.split('.');
        // const tokenStartPart = splitToken[0]; 
        // const padTokenStartPart = tokenStartPart.concat(process.env.TOKEN_SECRET_PART as string);
        // const tokenEndPart = splitToken[splitToken.length - 1];
        // const joinedTokenParts = [padTokenStartPart,tokenEndPart].join('.')
        // return joinedTokenParts;
        const secretPart = process.env.TOKEN_SECRET_PART as unknown as string;
        const finalToken = initialToken.concat(secretPart);

        return finalToken;
    } catch (error) {
        console.warn(error);
    }

}

function unpadToken(paddedToken: string): string | undefined {
    try {
        // const splitToken = paddedToken.split('.');
        // const tokenStartPart = splitToken[0];
        // const requiredPartLength = tokenStartPart.length - (process.env.TOKEN_SECRET_PART as unknown as string).length;
        // const realTokenStartPart = paddedToken.slice(0, requiredPartLength);
        // const joinedTokenParts = [realTokenStartPart, splitToken[1]].join('.');
        // return joinedTokenParts;

        const secretPart = process.env.TOKEN_SECRET_PART as unknown as string;
        const requiredPartLength = paddedToken.length - secretPart.length;
        const realToken = paddedToken.slice(0, requiredPartLength);

        return realToken;
    } catch (error) {
        console.warn(error);
    }
}

export {
    padToken,
    unpadToken
}