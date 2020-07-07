import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";


class  Countrypan extends Component{
constructor(props){ super(props);  this.state={path:"http://localhost:5000",username:null,arr:[{name:null,address:null,email:null,phone:null}],msg:null};
}
componentDidMount()
{ 
		this.state.username=localStorage.getItem('user');
		var data={name:null};

	fetch(this.state.path+'/getState',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
			
}	
render()
{
	
 return (
 <div >
 <center><h2 >PANDEMIC IN INDIA NOW<a href='/'><button class='btn-sm btn btn-primary'  style={{float:"right",marginRight:"0%"}}>Home</button></a></h2></center>  
<br></br><br></br> 
	<center><div class="row" style={{width:"60%"}}>
			<div class="col-lg-3"><button class='btn btn-primary'>STATE</button></div> 
			<div class="col-lg-3"><button class='btn btn-warning'>CURED/DISCHARGED</button></div>
			<div  class="col-lg-3"><button class='btn btn-danger'>DIED</button></div>
			 <div class="col-lg-3"><button class='btn btn-success'>CONFIRMED</button></div>
	</div></center>
<br></br><br></br>
	<div id='show1' >		
		
			{this.state.arr.map( res=>(<section>
		<center><div class='row' style={{backgroundColor:'pink',width:"60%",border:'5px solid purple',borderRadius:'10px',paddingTop:'10px' ,paddingBottom:'10px' }}>
				<div class="col-lg-3"><button class='btn btn-primary'>{res[0]}</button></div>
			    <div class="col-lg-3"><button class='btn btn-warning'>{res[2]}</button></div>
				<div class="col-lg-3"><button class='btn btn-danger'>{res[3]}</button></div>
				<div class="col-lg-3"><button class='btn btn-success'>{res[1]}</button></div>
			
				</div></center>
				<br></br><br></br></section>
             ))}
		 </div>
</div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Countrypan);
//export Showcart;



//export default Home;

