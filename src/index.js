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
        `📃This is the command palette:\n ⚠️/search [keyword] to use pornhub's search engine to find your favorite videos! \n ⚠️/gif [keyword] gay: will send you gay gif based on your keyword`);

})
//search for gif
bot.onText(/\/gif (.+)/, (msg, match)=>{
    const chatId = msg.chat.id;
    if(match[1].includes('gay')){
        const op = {
            sexualOrientation: 'gay'
        };

        ph.search('Gif', match[1], op)
        .then(res =>{
            if(res){
                let arrayData = [];
                for(let i =0; i < 3; i++){
                    const { data } = res;
                    let title = data[i].title;
                    let url = data[i].url;
                    let gif = data[i].webm;
                    arrayData.push(title, url, gif);
                }

                bot.sendMessage(chatId, "💨Title: " + arrayData[0] +"\n" + "💨Url " + arrayData[1] +"\n" + "💨Gif: " + arrayData[2] +"\n");
                bot.sendMessage(chatId, "💨Title: " + arrayData[3] +"\n" + "💨Url " + arrayData[4] +"\n" + "💨Gif: " + arrayData[5] +"\n");
                bot.sendMessage(chatId, "💨Title: " + arrayData[6] +"\n" + "💨Url " + arrayData[7] +"\n" + "💨Gif: " + arrayData[8] +"\n");
            } else{
                bot.sendMessage(chatId, `No videos was found for ${match[1]}`)
            }
        });
    } 
});

// search for videos
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
