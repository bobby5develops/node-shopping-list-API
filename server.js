var express = require('express'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
    app = express();

var Storage = {
	add: function(name) {
		var item = {name: name, id: this.setId};
		this.items.push(item);
		this.setId += 1;
		return item;
	}
};

var createStorage = function() {
	var storage = Object.create(Storage);
	storage.items = [];
	storage.setId = 1;
	return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

app.use(express.static('public'));

app.route('/items')
	.all(function (req, res, next) {
		
	})
	.get(function (req, res, next) {
		res.json(storage.items);
	})
	.post(function (req, res, next) {
		var item = storage.add(req.body.name);
		res.status(201).json(item);

		if (!('name' in res.body)){
			res.sendStatus(400);
		}

	});



app.listen(process.env.PORT || 8080, process.env.IP);
