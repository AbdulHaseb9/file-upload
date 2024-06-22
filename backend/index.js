const express = require('express')
var cors = require('cors')
const upload = require('./src/middleware/upload.middleware')
const cloudinary = require('cloudinary')
const fs = require('fs')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

app.get('/', (req, resp) => {
    resp.send('working')
})

app.post('/fi', (req, resp) => {
    const { file } = req.body
    resp.json(file)
})

app.post('/fileupload', upload.single('file'), async (req, resp) => {
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(req.file.path)

        // Delete example_file.txt
        fs.unlink(req.file.path,
            (err => {
                if (err) console.log(err);
                else {
                    console.log("File Deleted Successfull");
                }
            }));

        console.log("file", req.file);

        resp.status(200).send({
            message: 'file upload successfully',
            image: {
                original_name: req.file.originalname,
                url: uploadResult.secure_url
            }
        })

        // resp.json({ img_url: req.file.path })

    } catch (error) {
        resp.status(500).send({ message: 'file upload failed', error: error.message })
    }
})

app.listen(port, () => {
    console.log('server is runnning on', port);
})