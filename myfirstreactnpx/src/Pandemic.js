import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';




class Pandemic extends Component{
constructor(props){ super(props);  this.state={username:null,obj:{op1:'Loading...Please Wait..',op2:'Loading...Please Wait..',op3:'Loading...Please Wait..',op4:'Loading...Please Wait..'},msg:null};
}
componentDidMount()
{ 
		this.state.username=localStorage.getItem('user');
	document.getElementById('show1').style.opacity=1;
	fetch('http://localhost:8080/getPandemic',{ method: 'GET',
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({obj:body});  }).catch(err=>console.log(err));	
			
}	
render()
{
	
 return (
 <div style={{backgroundColor:'pink'}}>
 <center><h2 >PANDEMIC UPDATES</h2></center>  
<br></br><br></br> 
	<div class="row" >
			<div class="col-lg-6"><center><a href='/World'><button class='btn btn-primary'>Pandemic In World</button></a></center></div>
			<div class="col-lg-3"><center><a href='/Country'><button class='btn btn-success'>Pandemic In My Country</button></a></center></div>
	</div>
<br></br><br></br>
	<div id='show1'>		
		
			<div class='row' style={{backgroundColor:'white',border:'5px solid pink', borderRadius:'10px',paddingTop:'10px' ,paddingBottom:'10px' }}>
				<div class="col-lg-3" style={{backgroundColor:'beige',fontWeight:'bold',border:'5px solid pink',fontSize:'15px',borderRadius:'10px',padding:'10px' }}>1.<br></br>{this.state.obj.op1}</div><br></br><br></br>
			    <div class="col-lg-3" style={{backgroundColor:'white',fontWeight:'bold',border:'5px solid pink',fontSize:'15px',borderRadius:'10px',padding:'10px' }}>2.<br></br>{this.state.obj.op2}</div>
				<div class="col-lg-3" style={{backgroundColor:'lightgreen',fontWeight:'bold',border:'5px solid pink',fontSize:'15px',borderRadius:'10px',padding:'10px' }}>3.<br></br>{this.state.obj.op3}</div>
				<div class="col-lg-3" style={{backgroundColor:'cyan',fontWeight:'bold',border:'5px solid pink',fontSize:'15px',borderRadius:'10px',padding:'10px' }}>4.<br></br>{this.state.obj.op4}</div>
				</div>
				<br></br><br></br>
		 </div>
</div>
  )
}

}
export {Pandemic};


