import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!, {})
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongodb connected!')
        })

        connection.on('error', (err) => {
            console.log('Unable to connect with mongodb')
            process.exit();
        })
        
    } catch (error) {
        console.log('Mongodb connection error', error)
        process.exit();
    }
}