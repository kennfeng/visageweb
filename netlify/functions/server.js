import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Netlify Functions!' });
});

// Export the app as a Netlify function
export const handler = serverless(app);