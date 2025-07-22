import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import bodyParser from 'body-parser';

import { connectDB } from './db/connection';
import helperRoutes from './routes/helper.routes';

const app = express();
const PORT = 3000;
app.use(morgan('dev'));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use('/api/helpers', helperRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}); //First mongoDB is connected and then server is running
