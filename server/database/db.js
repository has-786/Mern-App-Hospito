mongoose=require('mongoose');
function con(mongoose){
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});                
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database is connected');
});			
}

var userSchema=new mongoose.Schema({name:String,email:String,pass:String,type:String,specialist:String});
var user=mongoose.model('user',userSchema);


var productSchema=new mongoose.Schema({prodName:String,price:Number,disease:String});  
var product=mongoose.model('product',productSchema);                                    

var OrderSchema=new mongoose.Schema({userId:String,paymentId:String,address:String,prods:[productSchema],amount:Number,paymentMethod:{type:String,default:'Cash'},timestamp:String});  
var order=mongoose.model('order',OrderSchema);

var CartSchema=new mongoose.Schema({userId:String,prods:[productSchema]});  
var cart=mongoose.model('cart',CartSchema);

var appointSchema=new mongoose.Schema({name:String,docname:String,stat:{type:String,default:'Pending'},timestamp:{type:String,default:null} });
var appoint=mongoose.model('appoint',appointSchema);


var hospitalSchema=new mongoose.Schema({name:String,address:String,email:String,phone:String});
var hospital=mongoose.model('hospital',hospitalSchema);


module.exports={con:con,user:user,cart:cart,product:product,order:order,appoint:appoint,hospital:hospital};






