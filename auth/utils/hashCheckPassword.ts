import bcrypt from "bcrypt";

const SALT_FACTOR = 10;
/**
 * Hash the user password
 * @param {string} userPassword
 * @returns a string of value
 */
function hashPassword(userPassword: any) {
    try {
        let salt = bcrypt.genSaltSync(SALT_FACTOR);
        let hashedPassword = bcrypt.hashSync(userPassword, salt);
        return hashedPassword; // store return hashedPassword in DB  
    } catch (error) {
        console.warn(error);
    }
}

/**
 * Check whether user credentials are valid
 * @param {string} hashedPassword
 * @param {string} userPassword
 * @returns a bolean value
 */
function checkPassword(userPassword: any, hashedPassword: any) {
    try {
        return bcrypt.compareSync(userPassword, hashedPassword); // return boolean
    } catch (error) {
        console.warn(error);
    }

}

export {
    hashPassword,
    checkPassword
}