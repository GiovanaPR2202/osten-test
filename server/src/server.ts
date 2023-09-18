import express, {Response, Request} from 'express';
import cors from 'cors';
import Controllers from './controllers/controllers';
import swaggerSpec from './swaggerConfig';
import swaggerUi from 'swagger-ui-express';

const corsOptions = {
    origin: 'https://localhost:5050', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
    optionsSuccessStatus: 204, 
};

const app = express();



app.use(Controllers)
app.use(cors);
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.listen(5050, ()=>{
    console.log("Server is Running in");
});