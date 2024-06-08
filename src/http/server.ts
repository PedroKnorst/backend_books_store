import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from './routes';
import { ErrorHandler } from './middlewares/ErrorHandler';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(ErrorHandler);

const PORT = process.env.HTTP_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
