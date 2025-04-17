import mongoose from 'mongoose';
import 'dotenv/config';

const connection = async () => {
    try {
        const db_url = process.env.MONGODB_URI;
        await mongoose.connect(db_url)
        .then (() => {
            console.log("Database Successfully Connected ----------->")
        })
    } catch (error) {
        console.log("Database Not Connected !!!!!!!!!!!!! -", error);
    }
}

export default connection;