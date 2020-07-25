const {Router} = require("express");
const multer = require("multer");
const path = require("path");
const router = Router();
const photoPath = path.resolve(__dirname, "../../client/photo-viewer.html");

var filename = function(request, file, callback) {
	callback(null, file.originalname);
}

var fileFilter = function(request, file, callback) {
	if(file.mimetype != "image/png") {
		request.fileValidationError = "Wrong file type";
		callback(null, false, new Error("Wrong file type"));
	} else {
		callback(null, true);
	}
}

const storage = multer.diskStorage({
	destination: "api/uploads/",
	filename: filename
});

const upload = multer({
	fileFilter: fileFilter,
	storage: storage
});

router.post("/upload", upload.single("photo"), (request, response) => {
	if(request.fileValidationError) {
		return response.status(400).json({error: request.fileValidationError});
	} else {
		return response.status(201).json({success: true});
	}
});

router.get("/photo-viewer", (request, response) => {
	response.sendFile(photoPath);
});

module.exports = router;
