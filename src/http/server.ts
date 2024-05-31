import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();
app.use(cors());
app.use(router);

const PORT = process.env.HTTP_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
