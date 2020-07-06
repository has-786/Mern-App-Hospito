import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;



class Updateappoint extends Component
{
	constructor(props){
		super(props);
this.state={path:"http://localhost:5000",username:null,arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
	}
		componentDidMount(){
	this.state.username=localStorage.getItem('user');
	
	var data={docname:this.state.username}; //this.setState({ position: 1 });
	fetch(this.state.path+'/showAppointToDoctor',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{
	 this.setState({arr:body});document.getElementById('show3').style.opacity=1;}).catch(err=>console.log(err));	

}


render()
{
 return (
 <div style={{width:"100%"}}>
 <center><h2 style={{width:"100%"}} >MY APPOINTMENTS WITH PATIENTS</h2></center>   
 
 
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
<div class="col-lg-4"><button class='btn btn-info'>Patient</button>	</div><div class="col-lg-8"><button class='btn btn-warning'> {res.name} </button></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-4"><button class='btn btn-info'>Status</button></div><div class="col-lg-8"><button class='btn btn-success'> {res.stat!=res.name+'stat'?res.stat:'___'} </button></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-4"><button class='btn btn-info'>Time</button></div> <div class="col-lg-8"><button class='btn btn-danger'> {res.timestamp!=res.name+'time'?res.timestamp:'__'} </button>	</div>
			</div>
			<br></br>
			
			<div class="features-icons-icon d-flex" >
<div class="col-lg-4"><button class='btn btn-info'>Activity</button></div>
<div class="col-lg-8"><select type='text' id={res.stat} ><option>Confirmed</option><option>Rejected</option></select></div>
			</div><br></br>
			 
			<div class="features-icons-icon d-flex" >
				<div class="col-lg-12"><button class='btn btn-primary'>Date & Time</button></div>
			</div><br></br>
			
			<div class="features-icons-icon d-flex" >
				<div class="col-lg-3"><button class='btn btn-secondary'>DD-MM-YY</button></div>
				<div class="col-lg-9">
				<select id={res.timestamp+'date'} ><option>01</option><option>02</option>
					<option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option>
					<option>01</option><option>09</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option>
					<option>01</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option>
					<option>21</option><option>22</option><option>23</option><option>24</option><option>24</option><option>25</option><option>26</option>
					<option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select>
				<select id={res.timestamp+'month'} ><option>01</option><option>01</option>
							<option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option>
							<option>09</option><option>10</option><option>11</option><option>12</option></select>
				<select id={res.timestamp+'year'} ><option>2020</option><option>2021</option><option>2022</option></select>
				</div>    
			</div><br></br>
			
			
			<div class="features-icons-icon d-flex" >
							<div class="col-lg-3"><button class='btn btn-secondary'>H-M-S</button></div>
							<div class="col-lg-9">
				<select id={res.timestamp+'hour'} >
		<option>01</option><option>01</option> 
		<option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option>
		<option>09</option><option>10</option><option>11</option><option>12</option>
				</select>
							
		<select id={res.timestamp+'minute'} >
			<option>00</option><option>15</option><option>30</option><option>45</option>
		</select>
		
		<select id={res.timestamp+'second'} >
			<option>00</option><option>15</option>
			<option>30</option><option>45</option>
		</select>          
		<select id={res.timestamp+'ampm'} ><option>am</option><option>pm</option></select>
				</div>
			</div><br></br>
			
					

			
			
			
			<div class="features-icons-icon d-flex">
		 <div class="col-lg-12" style={{textAlign:'center'}}><button  class='btn btn-warning' id={res.name} onClick={this.fun.bind(this,username,res.name,res.stat,res.timestamp)} >Confirm</button><br></br></div>
				<br></br><br></br><br></br>
			</div>
	</div>
  </div><br></br><br></br><br></br>
</div>
))}
</div></div>
</section>
	</div> 
  
 
 
 
 
 

	</div>)
}
	fun=(username,name,stat,timestamp)=>{
	var data={"docname":this.state.username,"name":name,"stat":document.getElementById(stat).value,"timestamp":
	document.getElementById(timestamp+'date').value+'-'+document.getElementById(timestamp+'month').value+'-'+document.getElementById(timestamp+'year').value+
	' '+document.getElementById(timestamp+'hour').value+':'+document.getElementById(timestamp+'minute').value+':'+document.getElementById(timestamp+'second').value
	+' '+document.getElementById(timestamp+'ampm').value};
	alert(JSON.stringify(data));
		fetch('/updateAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg); document.getElementById(name).innerHTML='Done'; }).catch(err=>console.log(err));
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

export default connect(mapStateToProps, mapDispatchToProps)(Updateappoint);
//export Showcart;



//export default Home;




