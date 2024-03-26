/**
 * @author Gregory Vincent Jr
 * server file connecting aws s3 and frontend
 */
import express from 'express';
import generateImageURLs from "./backend/s3Functions.js";
import cors from "cors";
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors({
  origin: `http://localhost:5173`,
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.get('/getImageURLs', async (_req, res) => {
  try {
    const imageURLs = await generateImageURLs();
    res.json(imageURLs);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
