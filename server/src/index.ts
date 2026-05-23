import express, {Request, Response} from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import userRoutes from './routes/user';
import areaRoutes from './routes/area';
import opportunityRoutes from './routes/opportunity';
import inspirationRoutes from './routes/inspiration';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/areas', areaRoutes);
app.use('/opportunities', opportunityRoutes);
app.use('/inspirations', inspirationRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});