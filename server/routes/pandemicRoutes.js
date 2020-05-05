
module.exports=function(app){
const request=require('request')
const cheerio=require('cheerio')
const fs=require('fs')

/*
 "google-map-react": "^1.1.5",
    "mongoose": "^5.9.10",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-geolocated": "^3.0.1",
    "react-google-maps": "^9.4.5",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.2.0",
    "typescript": "^3.8.3"
*/
var c1,c2,c3,url

//var json={c1:"",c2:"",c3:""}


app.post('/getCountry',(req,res)=>{
	var op=''
	
	url="https://www.worldometers.info/coronavirus/countries-where-coronavirus-has-spread/"
	var twod=[]
	//twod holds countrywise data row by row for table reference visit the above url
	
	request(url, function(error,response,html){
		var op1='';
		var $=cheerio.load(html);
		
		var arr=[]
		var selector="#table3 > tbody > tr > td"
		
		$(selector).each((i,e)=>{
			arr.push($(e).text())
		})
		
		//group row wise
		for(i=0;i<arr.length-3;i+=4){
			var row=[]
			for(j=0;j<4;j++){
				row.push(arr[i+j])
			}
			twod.push(row)
		}
		
		console.log("\n\nCountrywise data of World:\n")
		
		//print the table on console
		for(i=0;i<twod.length;i++){
			console.log(twod[i])
		}
		res.send(twod);
		
	})
	
	
	
	
	
});

app.post('/getState',(req,res)=>{
	var op='';
	
	url="https://www.mygov.in/corona-data/covid19-statewise-status/"
	var twod=[]
	//twod holds statewise data row by row for table reference visit the above url
	
	request(url, function(error,response,html){
		var op1='';
		var $=cheerio.load(html);
		
		var arr=[]
		var selector="#node-287111 > div > div.field-collection-container.clearfix > div > div.field-items > div > div > div > div > div.field > div.field-items > div"
		
		$(selector).each((i,e)=>{
			arr.push($(e).text())
		})
		
		//group row wise
		for(i=0;i<arr.length-3;i+=4){
			var row=[]
			for(j=0;j<4;j++){
				row.push(arr[i+j])
			}
			twod.push(row)
		}
		
		console.log("\n\nStatewise data of India:\n")
		
		//print the table on console
		for(i=0;i<twod.length;i++){
			console.log(twod[i])
		}
		res.send(twod);
		
	})
	
	
	
	
	
});

op={};
app.post('/getPandemic',(req,res)=>{
	let op=''
	url='https://www.who.int/health-topics/coronavirus#tab=tab_1'
	
	request(url, function(error,response,html){
		var $=cheerio.load(html)
		var op1='COVID-19 \n\n'
		$(".sf_colsIn").filter(function(){
			var data=$(this)
			
			title=data.find('p:nth-child(1)').text()
			op1+=title.slice(0,120)
			//console.log(title)
			//res.write(title.slice(0,120)+'...')
			//res.write('read more on :'+url)
			//json.c1=title
		})
		
		op1+='...\n read more on '+url
		op1+="\n \n \n"
		global.op.op1=op1;
		//res.write(op1)
		
	})
	
	url2='https://www.who.int/health-topics/ebola/#tab=tab_1'
	
	request(url2, function(error,response,html){
		var $=cheerio.load(html)
		var op2='BEWARE OF EBOLA\n\n'
		$(".sf_colsIn").filter(function(){
			var data=$(this)
			title=data.find('p:nth-child(1)').text()
			op2+=title.slice(0,120)
			
		})
		
		op2+='...\n read more on '+url2+'\n\n\n\n'
		global.op.op2=op2;
		//res.write(op2)
		
	})
	
	url3="https://www.who.int/news-room/fact-sheets/detail/hepatitis-a"
	
	request(url3, function(error,response,html){
		var $=cheerio.load(html)
		var op3='THE MOST DANGEROUS HEPATITIS\n\n'
		$(".sf-detail-body-wrapper").filter(function(){
			var data=$(this)
			title=data.find("div").find('p:nth-child(1)').find("span").text()
			op3+=title
		})
		
		op3+='...\n read more on '+url3+'\n\n\n\n'
		global.op.op3=op3;
		//res.write(op3)
		
	})
	
	
	url4="https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death"
	
	request(url4, function(error,response,html){
		var $=cheerio.load(html)
		var op4='TOP 10 CAUSES OF DEATH \n\n'
		$(".sf-detail-body-wrapper").filter(function(){
			var data=$(this)
			title=data.find("div").find("div").find('p:nth-child(1)').find("span").text()
			op4+=title
		})
		
		op4+='...\n read more on '+url4+'\n\n\n\n'
		global.op.op4=op4;res.send(global.op);	console.log(global.op);

		
	})
		//	console.log(op);
		

	
});

}

