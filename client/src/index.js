import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import {Provider} from "react-redux";

import './index.css';
import Home from './Home';
import {Profile} from './Profile';
import {Signup,Signin} from './Signup';
import {forgotPassword,changePassword,updatePassword} from './Password';
import Medicine from './Medicine';
import Showcart from './Showcart';
import {Order,Payment} from './Order';
import {Donation,ShowDonation} from './Donation';
import {ShowBlog} from './Blog';
import {Showdoctor,Showappoint,Updateappoint} from './Appoint';
import {Hospital} from './Hospital';                                 
import {Ambulance,NewDriver,OldDriver} from './Ambulance';            
import {GetAmbulance} from './GetAmbulance';   
import {WorldPan} from './WorldPan';
import {CountryPan} from './CountryPan';
import {Pandemic} from './Pandemic';
import {InsertBlog,InsertHospital,InsertProduct,InsertVideo,Insert} from './Insertion';
import {DeleteBlog,DeleteHospital,DeleteProduct,DeleteVideo,Delete} from './Deletion';
import {Video} from './Video';

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
<Router>
		  <Provider store={store}>
			<Route exact path='/' component={Home}/>
		  </Provider>
		  <Provider store={store}>  
			<Route exact path='/medicine' component={Medicine}/>
		  </Provider>		  
		  <Route exact path='/signup' component={Signup}/>
		  <Route exact path='/signin' component={Signin}/>
		  <Route exact path='/profile' component={Profile}/>
		  <Route exact path='/showdoctor' component={Showdoctor}/>
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
		  <Route exact path='/cart' component={Showcart}/>
		  <Route exact path='/ShowBlog' component={ShowBlog}/>
		  <Route exact path='/Ambulance' component={Ambulance}/>
		  <Route exact path='/GetAmbulance' component={GetAmbulance}/>  
		  <Route exact path='/newdriver' component={NewDriver}/>
		  <Route exact path='/olddriver' component={OldDriver}/>
		  <Route exact path='/World' component={WorldPan}/>
		  <Route exact path='/Country' component={CountryPan}/>
		  <Route exact path='/Pandemic' component={Pandemic}/>
		  <Route exact path='/InsertHospital' component={InsertHospital}/>
		  <Route exact path='/InsertProduct' component={InsertProduct}/>
		  <Route exact path='/InsertVideo' component={InsertVideo}/>
		  <Route exact path='/Insert' component={Insert}/>
		  <Route exact path='/DeleteBlog' component={DeleteBlog}/>
		  <Route exact path='/DeleteHospital' component={DeleteHospital}/>
		  <Route exact path='/DeleteProduct' component={DeleteProduct}/>
		  <Route exact path='/DeleteBlog' component={DeleteBlog}/>
		  <Route exact path='/DeleteVideo' component={DeleteVideo}/>
		  <Route exact path='/Delete' component={Delete}/>
		  <Route exact path='/Video' component={Video}/>
	
</Router>
,document.getElementById('root'));

/*
//import {render} from "react-dom";
//import React from "react";
/*
import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import {Provider} from "react-redux";

import App from "./App";
		  <Route exact path='/cart' component={Showcart}/>

const mathReducer = (state = {
    result: 1,
	num:0,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
				num:state.num+action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
    }
    return state;
};

const userReducer = (state = {
    name: "Max",
    age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;
    }
    return state;
};
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

const store = createStore(
    combineReducers({math: mathReducer, user: userReducer,home: homeReducer}),{}
);

store.subscribe(() => {
    // console.log("Store updated!", store.getState());
});
*/


