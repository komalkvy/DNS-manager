if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }


const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const mongoose  = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const dnsRecord = require('./models/dnsRecord');

const app = express();

const port = process.env.PORT || 8080;

const MongoDBStore = require("connect-mongo");

const dbUrl = process.env.DB_URI || 'mongodb://localhost:27017/dns-manager';
const secret= process.env.SECRET || "thisshouldbeabettersecret!";

mongoose.connect(dbUrl, { 
    });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const store = new MongoDBStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
  
  });
  
  store.on("error", function(e){
    console.log("SESSION STORE ERROR",e)
  })
  
  const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  };
  
  app.use(session(sessionConfig));
  app.use(flash());


app.use(cors());

app.use(bodyParser.json()); 

app.post('/newDNS',async (req,res) => {

        const DNSRecord = req.body;
        // Adding data into database
        const newEntry = new  dnsRecord(DNSRecord);
        await newEntry.save()
        console.log(newEntry);
        req.flash('success', 'Successfully added new DNS Record');
        console.log("Recieved DNS Record: ", dnsRecord);
        res.status(200).send('DNS Record added successfully');
        
});
app.get('/api/records/:id', async (req, res)=>{
    console.log(req.params.id);
     try{
       let theId=req.params.id;
       let rec =await dnsRecord.findById(theId);
       if(!rec) return res.status(404).json({msg:"No record with that ID"})
       res.status(200).json(rec);
     }catch(e){
       res.status(500).json(e);
     }
});
app.get('/api/records', async (req, res) => {
    const records = await dnsRecord.find({});
    res.json(records);
});

app.patch('/api/records/:id', async (req, res)=>{
      let theId=req.params.id;
      let rec =await dnsRecord.findByIdAndUpdate(theId,req.body);
      await  rec.save();
      res.json(rec);
});

app.delete('/api/records/:id', async (req, res)=>{
    let theId=req.params.id;
    let rec =await dnsRecord.findByIdAndDelete(theId);
    res.json({msg:"Record deleted successfully"});
});

app.listen(port, () => console.log(`Listening on ${port}`));