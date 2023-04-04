const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cors = require("cors")
const photo_schema = require("./models/models")
const app = express()
const port = 8000
app.use(express.json())
app.use(bodyparser.json())
app.use(cors())
mongoose.connect("mongodb+srv://photo_gallery:photo_gallery@cluster0.mhnruho.mongodb.net/?retryWrites=true&w=majority").then((res) => {
    console.log("connected to db")
}).catch((e) => {
    console.log(e)
})

app.post("/addphoto", async (req, res) => {
    try {
        // const upload = await cloudinary.v2.uploader.upload(req.file.path)
        const post = await photo_schema.create({
            label: req.body.label,
            file: req.body.file
        })
        res.status(200).json({
            status: "success",
            post
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

})

app.get("/gallery", async (req, res) => {
    // console.log("ok")
    try {
        // const photo = await photo_schema.find()
        const photos = await photo_schema.find()
        res.status(200).json({
            status: "ok",
            photos
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })

    }

})



app.delete("/delete/:_id", async (req, res) => {
    try {
        await photo_schema.deleteOne({ _id: req.params._id })
        res.status(200).json({
            status: "Success",
            message: "SuccessFully Deleted"
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }

})

app.listen(port, () => {
    console.log(`running on port ${port}`)
})
