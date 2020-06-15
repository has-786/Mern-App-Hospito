import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";

import './index.css';

import Home from './Home';

import Profile from './Profile';

import Signup from './Signup';
import Signin from './Signin';

import Medicine from './Medicine';
import Showcart from './Showcart';

import Showblog from './Showblog';

import Hospital from './Hospital';
import Insertimage from './Insertimage';
                                 
import Video from './Video';
   
import Worldpan from './WorldPan';
import Countrypan from './CountryPan';
import Pandemic from './Pandemic';

import Order from './Order';
import Payment from './Payment';

import Donation from './Donation';
import Showdonation from './Showdonation';

import Forgotpassword from './Forgotpassword';
import Changepassword from './Changepassword';
import Updatepassword from './Updatepassword';

import Ambulance from './Ambulance';  
import Getambulance from './GetAmbulance';          
import Newdriver from './Newdriver';            
import Olddriver from './Olddriver';            

import Showdoctor from './Showdoctor';
import Updateappoint from './Updateappoint';
import Showappoint from './Showappoint';

import Insertblog from './Insertblog';
import Inserthospital from './Inserthospital';
import Insertproduct from './Insertproduct';
import Insertvideo from './Insertvideo';
import Insert from './Insert';

import Deleteblog from './Deleteblog';
import Deleteproduct from './Deleteproduct';
import Deletehospital from './Deletehospital';
import Deletevideo from './Deletevideo';
import Delete from './Delete';




const homeReducer = (state = {
    name: "Hasnain" }, action) => {
    switch (action.type) {
        case "SET_MYNAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
    }
    return state;
};

const prodReducer = (state = {
    username:null,arr:[{prodName:null,quantity:null,price:null,disease:null}],obj:{prodName:null,price:null,disease:null},msg:null }, action) => {
    switch (action.type) {
        case "SHOW_ALL_PROD":
            state = {
                ...state,
                arr: action.payload
            };
            break;
		case "SEARCH_PROD":
            state = {
                ...state,
                arr: action.payload
            };
            break;
    }
    return state;
};

const store = createStore(
    combineReducers({prod: prodReducer,home: homeReducer}),{}
);
		
ReactDOM.render(
				<Provider store={store}>  

<Router>	  
			<Route exact path='/' component={Home}/>
			
			<Route  path='/Profile' component={Profile}/>

		  <Route  path='/Medicine' component={Medicine}/>
		  <Route  path='/Order' component={Order}/>
		  <Route  path='/Payment' component={Payment}/>
		  <Route  path='/Insertimage' component={Insertimage}/>

          <Route  path='/Hospital' component={Hospital}/>
		
		  <Route  path='/Donation' component={Donation}/>
				      <Route  path='/Showdonation' component={Showdonation}/>

		  <Route  path='/Ambulance' component={Ambulance}/>
	
		  <Route  path='/Pandemic' component={Pandemic}/>

		  <Route  path='/Video' component={Video}/>

		   <Route  path='/Signup' component={Signup}/>
		  <Route  path='/Signin' component={Signin}/>
		  
		  		  		  	  <Route  path='/Getambulance' component={Getambulance}/>  
		  <Route  path='/Worldpan' component={Worldpan}/>
		  <Route  path='/Countrypan' component={Countrypan}/>

		  <Route  path='/Newdriver' component={Newdriver}/>
		  <Route  path='/Olddriver' component={Olddriver}/>
		
		  <Route  path='/Showdoctor' component={Showdoctor}/>
		  <Route  path='/showappoint' component={Showappoint}/>
		  <Route  path='/Updateappoint' component={Updateappoint}/>
		  <Route  path='/Showcart' component={Showcart}/>
		  <Route  path='/Insertblog' component={Insertblog}/>
		  <Route  path='/Inserthospital' component={Inserthospital}/>
		  <Route  path='/Insertproduct' component={Insertproduct}/>
		  <Route  path='/Insertvideo' component={Insertvideo}/>
		  <Route  path='/Insert' component={Insert}/>
		  
		  <Route  path='/Deletehospital' component={Deletehospital}/>
		  <Route  path='/Deleteproduct' component={Deleteproduct}/>
		  <Route  path='/Deleteblog' component={Deleteblog}/>
		  <Route  path='/Deletevideo' component={Deletevideo}/>
		  <Route  path='/Delete' component={Delete}/>
		  
		  
		  <Route  path='/Showblog' component={Showblog}/>
		  
          <Route  path='/Forgotpassword' component={Forgotpassword}/>
          <Route  path='/Changepassword' component={Changepassword}/>
		  <Route  path='/Updatepassword' component={Updatepassword}/>
		
	
</Router>
		  </Provider>
,document.getElementById('root'));
