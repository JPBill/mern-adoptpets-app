import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/userRoute.js';

const app = express();

app.use('/server/user', userRouter);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});
