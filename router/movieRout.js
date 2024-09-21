const router = require('express').Router()
const User = require('../controller/userController')
const Movie = require('../controller/movieController')
const upload = require('../util/MoviePic')
const multer = require("multer")
router.post('/signup', User.signup)
router.post('/login', User.login)

// Movie Data 

const images = [
  { name: "movie_thumbnail", maxCount: 1 },
  { name: "movie_img", maxCount: 10 },
];


router.post('/', upload.fields(images), Movie.store)
router.get('/ViewMovie', Movie.index)
router.post('/:id', upload.fields(images), Movie.updates)
router.get("/update/:id", Movie.updates);

module.exports = router;