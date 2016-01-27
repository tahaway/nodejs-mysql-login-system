
module.exports = function(app, knex,bookshelf) {

		// Session Store variable
		var sessionEngine;

		// default(home) page get request.
		app.get('/',is_authenticated, function(req, res, next) {	
		res.render('index.ejs'); // load the index.ejs file
		});



		// post request for login verification
		app.post('/login',function(req, res, next) {	
	   
	   		// Password algorithm - Example : var hashedPassword = passwordHash.generate('password123');
			var passwordHash = require('password-hash');

	   		var username = req.body.username, password = req.body.password;

	   			// verifying account with account information.
	   		    User.forge({username: username }).fetch().then(function (user) {
				      if (!user) {
				      	
				      	// if password miss-match, render the login page.
				      	res.render('login.ejs', { error : 'Username is wrong, please try again.'} ); // load the index.ejs file

				      }
				      else {

				      	// Flitering Data Object of Bookshelf to simple Json Data.
				      	user = user.toJSON()

					      	// verifying password with account information.
   					 	if(passwordHash.verify(password, user.password)){
		
					      	// initate New Session
					      	sessionEngine = req.session;
					      	sessionEngine.id = user.id;
					      	sessionEngine.username = user.username;
					      	res.redirect('/');
				      
				        }else{
				           // if password miss-match, render the login page.
					       res.render('login.ejs', { error : 'Password is wrong, please try again.'} ); // load the index.ejs file

					    }


				      }
   			 	})
		
		});

		// login page get request
		app.get('/login', function(req, res, next) {



				res.render('login.ejs',{ error : ''}); // load the index.ejs file

		});

		// logout page get request
		app.get('/logout', function(req, res, next) {	

			// destroy session and redirect to our desire page.
			req.session.destroy(function(err){
			
			if(err){
			console.log(err);
			}
			else{
			res.redirect('/');
			}

			});
		
		});

};

//  verifying authenication via express engine.
var is_authenticated = function (req, res, next) {	
	sessionEngine = req.session;
    
    // verifying session contain username record.
    if(!sessionEngine.username){
    	return res.redirect('/login');
    }
    next();
};