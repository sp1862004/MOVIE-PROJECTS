const Movie = require('../model/movieModel');

exports.store = async (req, res) => {
  try {
    const { movie_name, movie_redate, movie_heroname, movie_heroin, movie_director, movie_produser, movie_budget } = req.body;

    /// single image
    const singleImg = req.files?.movie_thumbnail[0].filename;
    console.log(singleImg, "this is single image");

    ///// mulitple image
    const multiImg = [];
    req.files.movie_img.forEach((image) => {
      multiImg.push(image.filename);
    });

    console.log(multiImg, "this is mulitimg");

    const movie = await Movie.create({
      movie_name, movie_redate, movie_heroname, movie_heroin, movie_director, movie_produser, movie_budget, movie_thumbnail: singleImg, movie_img: multiImg
    })
    if (movie) {
      res.json({
        success: true,
        message: 'Movie record has been inserted 👌'
      })
    } else {
      res.json({
        success: false,
        message: "something wrong 😒"
      })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.index = async (req, res) => {
  const movie = await Movie.find()
  try {
    if (movie) {
      res.json({
        success: true,
        movie
      })
    } else {
      res.json({
        success: false,
        records: "no recordes"
      })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.trash = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "this is id");
    const deletedData = await Movie.findByIdAndDelete(id);
    console.log(deletedData, "data...");

    if (deletedData) {
      res.json({
        success: true,
        message: "Record has been deleted",
      });
    } else {
      res.json({
        success: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    console.log(error, "Error of trash in controller");
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the record",
    });
  }
};

exports.updates = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log(req.body);
    const singleImg = req.files?.movie_thumbnail[0].filename;
    console.log(singleImg, "this is single image");

    // console.log(updatedData, 'this is updated data')
    const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
    if (movie) {
      res.redirect("/");
    } else {
      res.json({
        success: false,
        message: "update not work",
      });
    }
  } catch (error) {
    console.log(error);
  }
};





