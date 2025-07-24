import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './db/connection';
import helperRoutes from './routes/helper.routes';
import multer from 'multer';
const upload = multer({ dest: './uploads' })

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/helpers', helperRoutes);

app.get('/', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
