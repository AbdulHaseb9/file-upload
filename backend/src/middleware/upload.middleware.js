const multer = require('multer')
const { v4: uuidv4 } = require('uuid');


// Set the storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp/')
        // public/temp/
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        const random = uuidv4()
        cb(null, random + " " + file.originalname)
    }
})


// Initialize upload variable
const upload = multer({ storage })

// Export the middleware
module.exports = upload