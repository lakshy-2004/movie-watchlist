import mongoose from "mongoose";


const completedSchema = new mongoose.Schema({
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

const Completed = mongoose.model('Completed', completedSchema);

export default Completed;