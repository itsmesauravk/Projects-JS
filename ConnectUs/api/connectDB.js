//database connection
const mongoose = require('mongoose');


function connectToDB()
{
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI not set. Make sure to set the environment variable.");
            process.exit(1);
        }
        
        mongoose.connect(
            process.env.MONGO_URI,
        ).then(() => {
            console.log("Connected to MongoDB");
        }).catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        });
        
        
    } catch (error) {
        console.log("Error is : ",error)
    }
}

module.exports = connectToDB;