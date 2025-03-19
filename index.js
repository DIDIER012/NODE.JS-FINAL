import express from 'express';
import conectDB from './src/config/db.js';
import morgan from 'morgan';
import ProductRoutes from './src/routes/productsRoutes.js'

conectDB();
const app = express()

app.use(express.json())
app.use(morgan('dev'))


const PORT = process.env.PORT || 3000

app.use('/api/products', ProductRoutes);

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}` )
})


