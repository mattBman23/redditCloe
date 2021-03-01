import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import trim from './middleware/trim';
// declare routes
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import subRoutes from './routes/subs';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());

app.get('/', (_, res) => {
  res.send('Hello');
});

// use routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/subs', subRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await createConnection();
    console.log('Database Connected successfully');
  } catch (err) {
    console.log(err);
  }
});
