var Todo = require('./models/todo');
var Users = require('./models/users');

module.exports = function(app) {

	// Get all the users	
	app.get('/api/users', function(req, res) {

		// use mongoose to get all users in the database
		Users.find(function(err, user) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(user); // return all users in JSON format
		});
	});
	
	
	// create user and send back all users after creation
	app.post('/api/users', function(req, res) {

		// create a user, information comes from AJAX request from Angular
		Users.create({
			FirstName 	: req.body.FirstName,
            LastName 	: req.body.LastName,
            UserName 	: req.body.UserName,
            Password 	: req.body.Password, 
            DoB 		: req.body.DoB ,                       
            Phone 		: req.body.Phone,
            Address 	: req.body.Address,
            City 		: req.body.City,
            State 		: req.body.State,
            Country 	: req.body.Country,
            CreatedTimeStamp: req.body.CreatedTimeStamp
		}, function(err, user) {
			if (err)
				res.send(err);
		});

	});
	
	
	
	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/html/register.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};