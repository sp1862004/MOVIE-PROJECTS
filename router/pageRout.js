const Movie = require('../model/movieModel');
const router = require('express').Router()
const images = [
    { name: "movie_thumbnail", maxCount: 1 },
    { name: "movie_img", maxCount: 10 },
];
const upload = require("../util/MoviePic")
//LOGIN+LOGOUT START//
router.get('/', (req, res) => {
    // check cookie
    console.log(req.cookies.user)
    if (!req.cookies.user) {
        res.redirect('/signin')
    }

    const user = req.cookies.user;
    res.render('pages/index', {
        title: 'deshboard',
        user: req.cookies.user
    })
})
router.get('/signup', (req, res) => {
    res.render('pages/signup', {
        title: 'signup'
    })
})
router.get('/signin', (req, res) => {
    res.render('pages/signin', {
        title: 'signin'
    })
})
router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/sigin')
})
//LOGIN+LOGOUT END//


router.get('/ViewMovie', async (req, res) => {
    const movie = await Movie.find()
    res.render('pages/ViewMovie', {
        title: 'viewMovie',
        movie: movie
    })
})

router.get('/AddMovie', (req, res) => {
    res.render('pages/AddMovie', {
        title: 'addMovie'
    })
})

router.get('/imgmovies/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const movie = await Movie.findById(id)
    console.log(movie)
    res.render('pages/imgmovies', {
        title: 'imgmovies',
        movie: movie
    })
})

router.post("/delete/:id", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

router.get('/update/:id', async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id)
    res.render('pages/update', {
        title: 'update',
        movie

    })
})
router.post('/update/:id', upload.fields(images), async (req, res) => {
    try {
        const { movie_name, movie_redate, movie_heroname, movie_heroin, movie_director, movie_produser, movie_budget } = req.body;
        const singleImg = req.files?.movie_thumbnail[0].filename;
        console.log(singleImg, "this is single image");

        ///// mulitple image
        const multiImg = [];
        req.files.movie_img.forEach((image) => {
            multiImg.push(image.filename);
        });
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            movie_name: movie_name,
            movie_redate: movie_redate,
            movie_heroname: movie_heroname,
            movie_heroin: movie_heroin,
            movie_director: movie_director,
            movie_produser: movie_produser,
            movie_budget: movie_budget,
            movie_thumbnail: singleImg,
            movie_img: multiImg,
        })
        res.redirect("/ViewMovie", { movie })
    } catch (error) {
        console.log(error);

    }
})
router.get("/single/:id", async (req, res) => {
    const item = await Movie.findById(req.params.id);
    res.render('pages/ViewMultiMovie', {
        title: 'update',
        item: item
    })
})
module.exports = router;