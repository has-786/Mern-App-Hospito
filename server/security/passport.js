var GoogleStrategy = require( 'passport-google-oauth2').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose=require('mongoose');
db=require('../database/db.js');
db.con(mongoose);
user=db.user;

module.exports = function(passport) {

passport.use(new GoogleStrategy({
    clientID: '763965236945-a921fnmkglhd7jgoevoi6afg9v39mggm.apps.googleusercontent.com',
    clientSecret: 's7rde5cmfbJ4vDH_pC9sb-ai',
    callbackURL: 'http://localhost:8080/auth/google/callback',
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
   global.name=profile.displayName+profile.id; 
   
   user.findOne({name:profile.displayName+profile.id},(err,user1)=>{
	   if(err)console.log(err);
	   else if(!user1)
	    { 
			var newUser=new user({name:profile.displayName+profile.id,email:profile.email,pass:null,type:'User'});
			newUser.save((err,user2)=>{if(err)console.log(err); else console.log(user2); });
		}
   })
   
 
  }
));


passport.use(new FacebookStrategy({
    clientID: '951232498570438',
    clientSecret: '1c8a49037b9f4e6a13faadd0ebf5a419',
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
	  console.log(profile); 
   global.name=profile.displayName+profile.id;
   
   user.findOne({name:profile.displayName+profile.id},(err,user1)=>{
	   if(err)console.log(err);
	   else if(!user1)
	    { 
			var newUser=new user({name:profile.displayName+profile.id,email:null,pass:null,type:null});
			newUser.save((err,user2)=>{if(err)console.log(err); else console.log(user2); });
		}
   })
   
 
  }
));
passport.use(new LinkedInStrategy({
    clientID: '81hqxsgbcmrvfq',
    clientSecret: 'QySpAJrjqoaUd32I',
    callbackURL: "http://localhost:8080/auth/linkedin/callback",
	state: true
  },function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
	  console.log(profile);
	  global.name=profile.displayName+profile.id;
	  user.findOne({name:profile.displayName+profile.id},(err,user1)=>{
	   if(err)console.log(err);
	   else if(!user1)
	    { 
			var newUser=new user({name:profile.displayName+profile.id,email:null,pass:null,type:null});
			newUser.save((err,user2)=>{if(err)console.log(err); else console.log(user2); });
		}
   })
   
    return done(null, profile);
  });
}));
}