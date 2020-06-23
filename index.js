const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;

const app = express();

app.use(session({
	secret:"abc1234ABC!@",
	resave: false,
  saveUninitialized: true,
  cookie: { secure: true,maxAge:1000*60 }
}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.set('views',"./views");

app.get('/login',(req,res)=>{
	res.render('login');
});


app.post('/login', passport.authenticate('local', 
	{ 
	 successRedirect: '/abc',
   failureRedirect: '/login'
   // failureFlash: true 
 })

);

passport.use(new localStrategy(
  function(email, password, done) {
  	console.log(email);
  	console.log(password);
  	console.log(done);
      if (email === "123") {
        if(password === "123"){
        	return done(null,email);
        }
        else{
        	return done(null,false);
        }
      }
      else{
      	return done(null,false);
      }
    }
));

passport.serializeUser((email,done) => {
    done(null, email);
});
passport.deserializeUser((email, done) => {
    //tại đây hứng dữ liệu để đối chiếu
    if (email === '123') { //tìm xem có dữ liệu trong kho đối chiếu không
        return done(null, email);
    } else {
        return done(null, false);
    }
});

app.get('/abc',(req,res)=>{
	res.render('abc');
});

app.get('/bcd',(req,res)=>{
	res.render('bcd');
});

const port = process.env.PORT || 212;

app.listen(port,()=>{
	console.log(`The server has been started at the port: ${port} or http://localhost:${port}`);
});

