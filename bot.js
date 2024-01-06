const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = '6740976568:AAEAd0_uA8IAbtepREm0_YhA9A9stlkUSL8';
const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(bodyParser.json());

app.post('/API_ENDPOINT', (req, res) => {
    const chatId = req.body.chatId;
    const message = req.body.message;

    bot.sendMessage(chatId, message).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        res.status(500).send(error.toString());
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
