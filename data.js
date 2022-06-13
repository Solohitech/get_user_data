const express=require('express')
const app= express();
const PORT=1000;
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/rexbiz').then(()=>{
	console.info('database connected success!')
}).catch(error=>{
	console.info(error)
})

const schema= mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
})

const mongomodel=mongoose.model('cybercafe',schema)

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
	res.render('indes')
})

app.post('/auth',(req,res)=>{
	const {username,password}=req.body
    const smallgate=new mongomodel({username,password})
    smallgate.save((error,doc)=>{
    	console.info(doc)
    })

    res.render('users',{username,password})
})

app.listen(PORT,()=>console.info('server running on port',PORT))




