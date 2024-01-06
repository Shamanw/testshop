const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const bot = new TelegramBot('6740976568:AAEAd0_uA8IAbtepREm0_YhA9A9stlkUSL8', { polling: true });
const app = express();
app.use(cors())

app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    console.log("1")
    const queryId = req.body.queryId;
    bot.answerWebAppQuery(queryId, {
        type: 'article',
        id: 'queryResult',
        title: 'Відповідь від бота',
        input_message_content: {
            message_text: 'Це повідомлення від бота.'
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        //console.error(error);
        res.status(500).send(error.toString());
    });
});

app.listen(3050, () => console.log('Сервер запущено на порті 3050'));
