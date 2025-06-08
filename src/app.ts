import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

const app = express();

AppDataSource.initialize().then(() => {
  app.get('/users', async (_req, res) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  });

  app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
});
