const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const leaderboardRoutes = require('./routes/leaderboard');
const registerRouter = require('./routes/register');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(cors({
  origin: 'https://night-watcher.vercel.app', // Укажите ваш домен
  methods: ['GET', 'POST', 'OPTIONS'], // Разрешенные методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
}));

app.use(express.json());

// MongoDB URI
const mongoURI = 'mongodb+srv://api_backend_user:bNm6rjubtsyEELwh@night-watcher.1nbdj.mongodb.net/Game';

// Подключение к MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Подключение маршрутов
app.use('/getLeaderBoard', leaderboardRoutes);
app.use('/register', registerRouter);
app.use('/auth', authRouter);

// Обработчик корневого маршрута
app.get('/', (req, res) => {
  res.send('Welcome to the Night-Watcher API');
});

// Экспорт обработчика
module.exports = app;