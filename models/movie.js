import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Year: {
        type: String,
        required: true,
    },
    Poster: {
        type: String,
        required: true,        
    },
    Type: {
        type: String,
        required: true,
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },],

},{timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;