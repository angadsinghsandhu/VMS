const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

// storage management of the upload file
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './backend/assets');
    },
    filename: (req, file, cb) => {

        // extension
        const ext = MIME_TYPE_MAP[file.mimetype];

        // Access the provided 'page' and 'limt' query parameters
        let emp_id = req.params.emp_id;
        let entry_num = req.params.entry_num;
        let nameImg = `${emp_id}-${entry_num}.${ext}`

        cb(null, nameImg);
    }
});

// var upload = multer({ storage: storage }); 

module.exports = multer({ storage: storage }).single('file');