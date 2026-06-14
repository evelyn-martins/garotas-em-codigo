import { createServer } from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import userRoutes from './routes/user';
import areaRoutes from './routes/area';
import opportunityRoutes from './routes/opportunity';
import inspirationRoutes from './routes/inspiration';
import messageRoutes from './routes/messageRoutes';
import { setupSocket } from './socket';

const app = express();
const httpServer = createServer(app);
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/inspirations', inspirationRoutes);
app.use('/api/messages', messageRoutes);

setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});