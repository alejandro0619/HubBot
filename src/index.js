const TelegramBot = require('node-telegram-bot-api');
const PornHub = require('pornhub.js');
const { TelegramToken } = require('./keys');
const ph = new PornHub();

const bot = new TelegramBot(TelegramToken, {
    polling: true
});

bot.onText(/\/start/, msg => {
    let chatId = msg.chat.id;
    let nickName = msg.chat.username;
    bot.sendMessage(chatId, `Welcome ${nickName} 💦 to the first pornhub's search engine based bot \n use /help to get the commands! \n`);

})


bot.onText(/\/help/, msg => {
    let chatId = msg.chat.id;
    bot.sendMessage(chatId,
        `📃This is the command palette:\n ⚠️/search [keyword] to use pornhub's search engine to find your favorite videos! \n ⚠️/gif [keyword] will be added soon!`);

})

bot.onText(/\/search (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    ph.search('Video', match[1])
        .then(res => {
            if (res) {
                let arrayData = []
                for (let i = 0; i < 5; i++) {
                    const { data } = res;
                    let title = data[i].title;
                    let url = data[i].url;
                    let preview = data[i].preview;
                    arrayData.push(title, url, preview);
                }
                bot.sendMessage(chatId,
                    '🔞 Best videos for you, by your requirements: ' + match[1]
                )
                bot.sendMessage(chatId,
                    '🔞 Title:' + arrayData[0] + '\n' + '\n' +
                    '🔞 Link:' + arrayData[1] + '\n' + '\n' +
                    '🔞 Preview:' + '\n' + '\n'
                )
                bot.sendMessage(chatId,
                    '🔞 Title:' + arrayData[3] + '\n' + '\n' +
                    '🔞 Link:' + arrayData[4] + '\n' + '\n' +
                    '🔞 Preview:' + '\n' + '\n'
                )
                bot.sendMessage(chatId,
                    '🔞 Title: ' + arrayData[6] + '\n' + '\n' +
                    '🔞 Link: ' + arrayData[7] + '\n' + '\n' +
                    '🔞 Preview: ' + '\n' + '\n'
                )
            }
        })

});