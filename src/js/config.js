module.exports = [
	{ 
    	"type": "heading", 
    	"defaultValue": "STORJPebble" 
  	}, 
  	{ 
    	"type": "text", 
    	"defaultValue": "View the project source there -> https://github.com/eliassjogreen/STORJPebble" 
  	},
	{
		"type": "section",
		"items": [
			{
      			"type": "heading",
      			"defaultValue": "Settings"
    		},
			{
				"type": "input",
				"appKey": "interval",
				"defaultValue": "10000",
				"label": "Refresh interval (ms)",
				"attributes": {
					"placeholder": "10000",
					"required": "required",
					"type": "number"
				}
			},
			{
				"type": "input",
				"appKey": "nick",
				"label": "Node Nickname",
				"attributes": {
					"placeholder": "DEMO",
					"required": "required",
					"type": "text"
				}
			},
			{
				"type": "input",
  				"appKey": "id",
				"label": "Node Id",
				"attributes": {
					"placeholder": "ff67240e523fc15e2fbdf4caeed8421840e0f71c",
					"limit": 40,
					"required": "required",
					"type": "text"
				}
			}
		]
	},
	{
		"type": "submit",
		"defaultValue": "Save"
	}
];