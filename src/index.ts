import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';

const app: Application = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
