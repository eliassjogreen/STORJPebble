var UI = require('ui');
var ajax = require('ajax');

var node = {id: 'ff67240e523fc15e2fbdf4caeed8421840e0f71c', nick: 'NAS'};
var interval = 10000;
var main = new UI.Menu({
    sections: [{
		title: 'STORJ Node Viewer'
	}]
});

main.section(1, { title: node.nick, items: [
	{title: 'Node Id'}, 
	{title: 'Space available'}, 
	{title: 'Ip'}, {title: 'Port'}, 
	{title: 'Reputation'}, 
	{title: 'Response time'}, 
	{title: 'Last seen'}, 
	{title: 'Last timeout'}, 
	{title: 'Protocol'}, 
	{title: 'User agent'}
]});

setInterval(function() {
		ajax({ url: 'https://api.storj.io/contacts/' + node.id, type: 'json'},
		function(data) {
			main.items(1, [ { title: 'Node Id', subtitle: node.id},
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
}, interval);

main.show();
