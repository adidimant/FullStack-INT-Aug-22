const express = require("express");
const app = express();

app.set("view engine", "ejs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "Images");
  },
  filename: function (req, file, callback) {
    console.log(file)
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/upload",(req,res)=>{
  res.render("upload")
})


app.post("/upload", upload.single("image"), function (req, res, next) {
 res.send("Image Uploaded!")
  });

app.listen(8080, () => console.log("Server started on 8080"));