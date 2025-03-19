import mongoose from "mongoose";

const conectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('La base de datos esta concetada')
    } catch(error){
        console.error('Error al concetar la base de datos', error.message);
    }
}

export default conectDB;