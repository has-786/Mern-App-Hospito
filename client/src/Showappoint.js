import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";

let username=null;



class Showappoint extends Component{
	constructor(props){
		super(props);
this.state={username:null,arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
	}
	

	

componentDidMount()
{
	this.state.username=localStorage.getItem('user');
    if(this.state.username==null){alert('Please Login First'); }
	else {
	if(this.state.username)alert("Hi "+this.state.username);
		var data={name:this.state.username}; //this.setState({ position: 1 });
	fetch('/showAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{
  this.setState({arr:body});if(!body.length)alert('No result found'); document.getElementById('show3').style.opacity=1;} ).catch(err=>console.log(err));      
	}
}

render()
{
 return (
 <div style={{width:"100%"}}>
  <center><h2 style={{width:"100%"}}>MY APPOINTMENTS WITH DOCTORS</h2></center>   

  <div id='show3'><br></br><br></br>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.map( res=>( 
	    <div class="col-lg-4">		
					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{backgroundColor:"pink",borderRadius:'10px',border:"5px solid green"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-4"><button class='btn btn-info'>Doctor</button></div><div class="col-lg-8"><button class='btn btn-warning'> {res.docname} </button></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-4"><button class='btn btn-info'>Status</button></div><div class="col-lg-8"><button class='btn btn-success'> {res.stat!=res.name+'stat'?res.stat:'___'} </button></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-4"><button class='btn btn-info'>Time</button></div> <div class="col-lg-8"><button class='btn btn-danger'> {res.timestamp!=res.name+'time'?res.timestamp:'__'} </button>	</div>
			</div>
			<br></br><br></br>
			<div class="features-icons-icon d-flex">
		 <div class="col-lg-12" style={{textAlign:'center'}}><button  class='btn btn-warning' id={res.docname} onClick={this.fun.bind(this,this.state.username,res.docname)} >Cancel Request</button><br></br></div>
			</div>	<br></br>
			</div>
		</div><br></br><br></br><br></br>
	
        </div>
))}
</div></div>
</section>
	</div> 
  
  
 </div>
 )
}
fun=(username,docname)=>{
	var data={"name":username,"docname":docname};     // alert(JSON.stringify(data));
		fetch('/removeAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg); document.getElementById(docname).innerHTML='____'; }).catch(err=>console.log(err));
}
}


const mapStateToProps = (state) => {
  return {
      prod:state.prod
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAllProds: (arr) => {
            dispatch({
                type: "SHOW_ALL_PROD",
                payload: arr
            });
        },
		searchProds: (arr) => {
            dispatch({
                type: "SEARCH_PROD",
                payload: arr
            });
        }
    };
};

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default connect(mapStateToProps, mapDispatchToProps)(Showappoint);
//export Showcart;



//export default Home;