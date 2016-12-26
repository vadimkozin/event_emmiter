const { ChatApp } = require('./chat');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let readyToAnswer = (message) => {
    console.log('Готовлюсь к ответу');
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

webinarChat.prependListener('message', readyToAnswer);
vkChat.setMaxListeners(2);
vkChat.prependListener('message', readyToAnswer);

vkChat.once('close', () => console.log("Чат в контакте закрылся :("));
vkChat.close();

// Закрыть вконтакте
setTimeout( ()=> {
    if (vkChat.eventNames().length) {
        console.log('Закрываю вконтакте...');
        vkChat.removeListener('message', chatOnMessage);
    }
}, 1000 * 10 );

// Закрыть фейсбук
setTimeout( ()=> {
    console.log('Закрываю фейсбук, все внимание — вебинару!');
    facebookChat.removeListener('message', chatOnMessage);
}, 1000 * 15 );

// Закрыть вебинар
setTimeout( ()=> {
    console.log('Закрываю вебинар ...');
    webinarChat.removeListener('message', chatOnMessage);

    // если из слушателей 'message' остался только 'readyToAnswer', то можно закрыть вебинар полностью
    if (webinarChat.listenerCount('message') === 1 && webinarChat.listeners().indexOf('readyToAnswer')) {
        webinarChat.close();
    }
}, 1000 * 30);
