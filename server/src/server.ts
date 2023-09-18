import express, {Response, Request} from 'express';
import cors from 'cors';
import Controllers from './controllers/controllers';



const app = express();



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




app.use(Controllers)

app.use(cors);
app.use(express.json());




app.listen(5050, ()=>{
    console.log("Server is Running in");
});