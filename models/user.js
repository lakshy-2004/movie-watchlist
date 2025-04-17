import mongoose, { mongo } from "mongoose";    


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    movie:  [{
        type: mongoose.Types.ObjectId,
        ref: 'Movie',
    },],
    completed: [{
        type: mongoose.Types.ObjectId,
        ref: 'Completed',
    },],  

});

const User = mongoose.model('User', userSchema);

export default User;