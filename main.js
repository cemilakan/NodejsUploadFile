const express = require('express');
const multer = require('multer');
const app = express();

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, __dirname + '/uploads/images'); },
  filename: (req, file, cb) => { cb(null, Date.now() + "-" + Math.floor(Math.random() * 1000) + "." + (file.originalname.split('.').pop())); }
});
const fileFilter = (req, file, cb) => { cb(null, (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ? true : false); }
const upload = multer({ storage: storage, fileFilter: fileFilter});
app.post('/upload', upload.single('photo'), (req, res, next) => {
    try {
        return res.status(201).json({ message: 'File uploded.'});
    } catch (error) {
        res.status(404).json({ message: 'File can\'t uploded.'});
    }
});

app.listen(8000, () => console.log(`Listening port 8000!`));
