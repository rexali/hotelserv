import multer from "multer";

export function uploadFile(fieldname: string, fileSuffix: string,) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + fileSuffix)
        }
    });
    const upload = multer({ storage: storage }).single(fieldname);
    return upload

}
