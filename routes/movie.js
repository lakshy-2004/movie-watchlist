import express from 'express';

import User from '../models/user.js';
import Movie from '../models/movie.js'
import Completed from '../models/completed.js';

const router = express.Router();

// check
router.get('/check', async (req, res) => {
    res.status(200).json({ message: "Checked" });
});

// add
router.post('/add', async (req, res) => {
    try {
        const { Title, Year, Poster, Type, id } = req.body; 

        if (!Title || !Year || !Poster || !Type) {
            return res.status(200).json({ message: "All fields are required" });
        }

        const user = await User.findById(id); // check user exists
        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }

        const movie = await Movie.findOne({ Poster, user: user._id });// check movie exists or not        
        if (movie) {
            return res.status(200).json({ message: "Movie already exists in your watch list!" });
        }

        //updating movie list
        const newMovie = new Movie({
            Title,
            Year,
            Poster,
            Type,
            user: user._id,
        });
        await newMovie.save()
            .then(() => {
                res.status(200).json({ message: "Movie added successfully!", newMovie });
            })

        user.movie.push(newMovie);// updating movie list
        await user.save();

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

//delete
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.body;
        const existintUser = await User.findByIdAndUpdate(
            id,
            { $pull: { movie: req.params.id } }// remove movie from the user movie array
        )
        if (!existintUser) {
            return res.status(200).json({ message: "User not exitst!" });
        }

        await Movie.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Movie Succesfully deleted!" });
            })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

})

//get
router.get('/getmovies/:id', async (req, res) => {
    try {
        const movie = await Movie.find({ user: req.params.id }).sort({ createdAt: -1 });
        
        if (movie.length !== 0) {
            res.status(200).json({ movie });
        } else {
            res.status(200).json({ message: "No Movies" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

// add completed
router.post('/addcompleted', async (req, res) => {
    try {
        const { Title, Year, Poster, Type, id } = req.body; 

        if (!Title || !Year || !Poster || !Type) {
            return res.status(200).json({ message: "All fields are required" });
        }

        const user = await User.findById(id); // check user exists
        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }

        const movie = await Completed.findOne({ Poster, user: user._id });// check movie exists or not        
        if (movie) {
            return res.status(200).json({ message: "Movie already exists in your watch list!" });
        }

        //updating movie list
        const newMovie = new Completed({
            Title,
            Year,
            Poster,
            Type,
            user: user._id,
        });
        await newMovie.save()
            .then(() => {
                res.status(200).json({ message: "Movie Completed", newMovie });
            })

        user.completed.push(newMovie);// updating movie list
        await user.save();

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

// delete from completed
router.delete('/deleteCompleted/:id', async (req, res) => {
    try {
        const { id } = req.body;
        const existintUser = await User.findByIdAndUpdate(
            id,
            { $pull: { completed: req.params.id } }// remove movie from the user movie array
        )
        if (!existintUser) {
            return res.status(200).json({ message: "User not exitst!" });
        }

        await Completed.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Movie Succesfully deleted!" });
            })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

})

// get completed
router.get('/getcompletedmovies/:id', async (req, res) => {
    try {
        const movie = await Completed.find({ user: req.params.id }).sort({ createdAt: -1 });
        
        if (movie.length !== 0) {
            res.status(200).json({ movie });
        } else {
            res.status(200).json({ message: "No Movies" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

export default router;