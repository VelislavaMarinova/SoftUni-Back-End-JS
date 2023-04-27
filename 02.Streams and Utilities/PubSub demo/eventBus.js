const events = {};

function subscribe(eventName, callback) {
    if (!events[eventName]) {
        events[eventName] = []
        console.log('subscribe if',events);
    }
    events[eventName].push(callback)
    console.log('subscribe push',events);
}

function publish(eventName, data) {
    if(!events[eventName]){
        events[eventName]=[];
        console.log('publish if',events);
    }
    events[eventName].forEach(callback =>callback(data));
    console.log('publish forEach',events);

}

const eventBus = {
    subscribe,
    publish,
}

module.exports = eventBus;
