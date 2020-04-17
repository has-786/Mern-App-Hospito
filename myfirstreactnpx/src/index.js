import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

import './index.css';
import {Home} from './Home';
import {Profile} from './Profile';
import {Signup,Signin} from './Signup';
import {forgotPassword,changePassword,updatePassword} from './Password';
import {Medicine,Showcart} from './Medicine';
import {Order,Payment} from './Order';
import {Donation,ShowDonation} from './Donation';
import {InsertBlog,ShowBlog} from './Blog';
import {Showdoctor,Showappoint,Updateappoint} from './Appoint';
import {Hospital} from './Hospital';
import {Ambulance,NewDriver,OldDriver} from './Ambulance';
import {GetAmbulance} from './GetAmbulance';   

ReactDOM.render(
<Router>
		  <Route exact path='/' component={Home}/>		  
		  <Route exact path='/signup' component={Signup}/>
		  <Route exact path='/signin' component={Signin}/>
		  <Route exact path='/profile' component={Profile}/>
		  <Route exact path='/medicine' component={Medicine}/>
		  <Route exact path='/showdoctor' component={Showdoctor}/>
		  <Route exact path='/cart' component={Showcart}/>
		  <Route exact path='/showappoint' component={Showappoint}/>
		  <Route exact path='/order' component={Order}/>
		  <Route exact path='/payment' component={Payment}/>
		  <Route exact path='/updateappoint' component={Updateappoint}/>
          <Route exact path='/hospital' component={Hospital}/>
          <Route exact path='/forgotPassword' component={forgotPassword}/>
          <Route exact path='/changePassword' component={changePassword}/>
		  <Route exact path='/updatePassword' component={updatePassword}/>
		  <Route exact path='/Donation' component={Donation}/>
		  <Route exact path='/ShowDonation' component={ShowDonation}/>
		  <Route exact path='/InsertBlog' component={InsertBlog}/>
		  <Route exact path='/ShowBlog' component={ShowBlog}/>
		  <Route exact path='/Ambulance' component={Ambulance}/>
		  <Route exact path='/GetAmbulance' component={GetAmbulance}/>  
		  <Route exact path='/newdriver' component={NewDriver}/>
		  <Route exact path='/olddriver' component={OldDriver}/>
	


</Router>
,document.getElementById('root'));


