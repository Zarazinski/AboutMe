const express = require('express');
const auth = require('../auth/basic.auth');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

function generateFilename(req, file, cb) {
    const newFileName = uuidv4() + path.extname(file.originalname);
    cb(null, newFileName);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/" + file.fieldname));
    },
    filename: generateFilename
});

const upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 4 * 1024 * 1024,
    }
});

router.post('/avatar', auth, upload.single('avatar'), (req, res) => {
    console.log(`The avatar has been uploaded:\n ${JSON.stringify(req.file, null, 4)}`);

    return res.send({
        filename: req.file.filename,
        path: path.join('images', 'avatar', req.file.filename)
    });
});

router.post('/project', auth, upload.single('project'), (req, res) => {
    console.log(`The project image has been uploaded:\n ${JSON.stringify(req.file, null, 4)}`);

    return res.send({
        filename: req.file.filename,
        path: path.join('images', 'project', req.file.filename)
    });
});

module.exports = router;