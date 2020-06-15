import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";





class Insertimage extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }
//method="post" action="/insertImage"  enctype="multipart/form-data"
//		<input type='submit' class='btn btn-danger' value="Upload" />

render()
{
 return (
 <div>
  <center><h2 >UPLOAD GALLERY IMAGE</h2></center>
	<center>	<span><br></br><br></br></span>
    <form  >
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'   required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-primary' >Tags</button><input type='text' id='tags' name='tags'   required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Image</button><input type='file' id='img' name='image'    required/></div>
		<div><button class='btn btn-danger' onClick={this.fun2.bind(this)}>Upload</button></div>

		<span><br></br><br></br></span>

	<div>
	</div>
	<span><br></br><br></br></span>
	</form>
	</center>
</div>);
}



fun2=(event)=>{
			event.preventDefault();
		//if(!this.state.username){alert('Please Login First');return false;}
		var f=new FormData();
		f.append('name',document.getElementById('name').value);
				 		alert(JSON.stringify(f));

		var myfile=document.getElementById('img').files[0];
f.append('image',myfile,"myfile.jpg");   

	fetch('http://localhost:5000/insertImage',{ method:'POST',body:f }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
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

export default connect(mapStateToProps, mapDispatchToProps)(Insertimage);
