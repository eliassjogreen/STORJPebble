var UI = require('ui');
var ajax = require('ajax');

var Settings = require('settings');
var Clay = require('clay');
var clayConfig = require('config');
var clay = new Clay(clayConfig);

var options = Settings.option();

var node = {id: options.id, nick: options.nick};

var interval = options.interval;

var main = new UI.Menu({
    sections: [{
		title: 'STORJ Node Viewer'
	}]
});

main.section(1, { title: node.nick, items: [
	{title: 'Node Id'}, 
	{title: 'Space available'}, 
	{title: 'Ip'}, 
	{title: 'Port'}, 
	{title: 'Reputation'}, 
	{title: 'Response time'}, 
	{title: 'Last seen'}, 
	{title: 'Last timeout'}, 
	{title: 'Protocol'}, 
	{title: 'User agent'}
]});

Pebble.addEventListener('ready', function(e) {	
	setOptions();
	updateItems();
	main.show();
});

Pebble.addEventListener('showConfiguration', function(e) {
	var claySettings = JSON.parse(localStorage.getItem("clay-settings"));
	for (var key in claySettings) {
		if (claySettings.hasOwnProperty(key)) {
			if(key in options){
				claySettings[key] = options[key];
			}
		}
	}	
	localStorage["clay-settings"] = JSON.stringify(claySettings);
  	Pebble.openURL(clay.generateUrl());
	
	updateItems();
	main.show();
});

Pebble.addEventListener('webviewclosed', function(e) {	
	if (e && !e.response) {
		return;
	}
	
	var dict = clay.getSettings(e.response);
	
	Settings.option(dict);
	options = Settings.option();
	console.log(JSON.stringify(options));
	
	setOptions();
});

function setOptions() {
	interval = options.interval;
	node.id = options.id;
	node.nick = options.nick;
	
	updateItems();
}

function updateItems() {
	ajax({ url: 'https://api.storj.io/contacts/' + node.id, type: 'json'},
			function(data) {
				main.section(1, { title: node.nick });
				main.items(1, [ 
					{ title: 'Node Id', subtitle: node.id},
					{ title: 'Space available', subtitle: data.spaceAvailable.toString()},
					{ title: 'Ip', subtitle: data.address},
					{ title: 'Port', subtitle: data.port},
					{ title: 'Reputation', subtitle: data.reputation},
					{ title: 'Response time', subtitle: data.responseTime.toString()},
					{ title: 'Last seen', subtitle: new Date(data.lastSeen).toDateString() + ' ' + new Date(data.lastSeen).getHours() + ':' + new Date(data.lastSeen).getMinutes()},
					{ title: 'Last timeout', subtitle: new Date(data.lastTimeout).toDateString() + ' ' + new Date(data.lastTimeout).getHours() + ':' + new Date(data.lastTimeout).getMinutes()},
					{ title: 'Timeout rate', subtitle: data.timeoutRate},
					{ title: 'Protocol', subtitle: data.protocol},
					{ title: 'User agent', subtitle: data.userAgent}
				]);
			});
}

setInterval(function() {
	updateItems();
}, interval);
