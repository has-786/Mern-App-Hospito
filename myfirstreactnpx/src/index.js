import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import {Signup,Signin,Profile,Home,forgotPassword,changePassword,updatePassword} from './Home';
import {Medicine,Showcart,Order,Payment} from './Medicine';
import {Showdoctor,Showappoint,Updateappoint,Hospital} from './Appoint';
import {MainWithGeoloc} from './Demo';
import {SimpleMap} from './SimpleMap';
ReactDOM.render(
<Router>
		  <Route exact path='/medicine' component={Medicine}/>
		  <Route exact path='/showdoctor' component={Showdoctor}/>
		  <Route exact path='/signup' component={Signup}/>
		  <Route exact path='/signin' component={Signin}/>
		  <Route exact path='/profile' component={Profile}/>
		  <Route exact path='/' component={Home}/>		  
		  <Route exact path='/cart' component={Showcart}/>
		  <Route exact path='/showappoint' component={Showappoint}/>
		  <Route exact path='/order' component={Order}/>
         <Route exact path='/payment' component={Payment}/>
         <Route exact path='/updateappoint' component={Updateappoint}/>
         <Route exact path='/hospital' component={Hospital}/>
         <Route exact path='/forgotPassword' component={forgotPassword}/>
         <Route exact path='/changePassword' component={changePassword}/>
         <Route exact path='/updatePassword' component={updatePassword}/>
         <Route exact path='/demo' component={MainWithGeoloc}/>
		 <Route exact path='/simplemap' component={SimpleMap}/>


</Router>
,document.getElementById('root'));


