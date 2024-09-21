const {Schema, model} = require("mongoose");

const common = {
    type : String,
    require : true,
    trim : true
}

const movieSchema = new Schema ({
    movie_name : {
        ...common
    },
    movie_redate : {
        ...common
    },
    movie_heroname : {
        ...common
    },
    movie_heroin : {
        ...common
    },
    movie_director : {
        ...common
    },
    movie_produser : {
        ...common
    },
    movie_budget : {
        ...common
    },
    movie_thumbnail : {
        ...common
    },
    movie_img : {
        ...common,
        type : []
    }
},{timestamps:true})

const Movie = model('Movie',movieSchema)
module.exports = Movie