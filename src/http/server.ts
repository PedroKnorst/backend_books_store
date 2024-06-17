import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from './routes';
import { ErrorHandler } from './middlewares/ErrorHandler';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(ErrorHandler);

app.use('/static', express.static(path.join(__dirname, '..', '..', 'uploads')));

const PORT = process.env.HTTP_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
