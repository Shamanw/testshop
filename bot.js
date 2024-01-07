const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const bot = new TelegramBot('6740976568:AAEAd0_uA8IAbtepREm0_YhA9A9stlkUSL8', { polling: true });
let chatIdSave; // Змінна для зберігання chatId

bot.on('message', (msg) => {
    chatIdSave = msg.chat.id; // Оновлюємо chatId кожного разу, коли отримуємо повідомлення

    const options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ 
                    text: 'Відкрити веб-додаток', 
                    web_app: { url: 'https://shamanw.github.io/testshop/' }
                }]
            ]
        })
    };

    bot.sendMessage(chatIdSave, 'Натисніть на кнопку для відкриття веб-додатку:', options);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    const chatId = req.body.chatId; // Отримуємо chatId з тіла запиту

    if (!chatId) {
        res.status(400).send('chatId is missing');
        return;
    }

    bot.sendMessage(chatId, 'Це повідомлення надіслано від бота після натискання кнопки у веб-додатку.')
    .then(() => {
        console.log("Message sent to chatId:", chatId);
        res.sendStatus(200);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send(err.toString());
    });
});

app.listen(3050, () => console.log('Сервер запущено на порті 3050'));

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const options = {
//         reply_markup: JSON.stringify({
//             inline_keyboard: [
//                 [{ 
//                     text: 'Відкрити веб-додаток', 
//                     web_app: { url: 'https://shamanw.github.io/testshop/' } // URL вашого веб-додатку
//                 }]
//             ]
//         })
//     };

//     bot.sendMessage(chatIdSave, 'Натисніть на кнопку для відкриття веб-додатку:', options);
// });
// app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.post('/send-message', (req, res) => {
    
//     console.log(msg.chat.id)
//     bot.sendMessage(msg.chat.id, 'Це повідомлення надіслано від бота після натискання кнопки у веб-додатку.')
//     .then(() => {
//         console.log("Message sent to chatId:", );
//         res.sendStatus(200);
//     })
//     .catch(err => {
//         console.error(err);
//         res.status(500).send(err.toString());
//     });
// });

// // app.post('/send-message', (req, res) => {
// //     console.log("1")
// //     const queryId = req.body.queryId;
// //     bot.on('message', (msg) => {
// //         const options = {
// //             reply_markup: JSON.stringify({
// //                 inline_keyboard: [
// //                     [{ 
// //                         text: 'Відкрити веб-додаток', 
// //                         web_app: { url: 'https://shamanw.github.io/testshop/' } // URL вашого веб-додатку
// //                     }]
// //                 ]
// //             })
// //         };
    
// //         bot.sendMessage(chatId, 'Натисніть на кнопку для відкриття веб-додатку:', options);
// //     });
// //     console.log(queryId)
//     // bot.answerWebAppQuery(queryId, {
//     //     type: 'article',
//     //     id: 'queryResult',
//     //     title: 'Відповідь від бота',
//     //     input_message_content: {
//     //         message_text: 'Це повідомлення від бота.'
//     //     }
//     // }).then(() => {
//     //     res.sendStatus(200);
//     // }).catch(error => {
//     //     //console.error(error);
//     //     res.status(500).send(error.toString());
//     // });


// app.listen(3050, () => console.log('Сервер запущено на порті 3050'));
