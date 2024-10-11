import { createConnection } from 'typeorm';
import express from 'express';
import { User } from './entity/User.js';

const app = express();
const port = 3000;

app.use(express.json());

createConnection().then(async connection => {
  const userRepository = connection.getRepository(User);

  app.get('/users', async (req, res) => {
    const users = await userRepository.find();
    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    res.json(result);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await userRepository.findOneBy({ id: +req.params.id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

  app.put('/users/:id', async (req, res) => {
    
    let user = await userRepository.findOneBy({ id: +req.params.id });
    if (user) {
      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      res.json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const result = await userRepository.delete(req.params.id);
    res.json(result);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => console.log(error));
