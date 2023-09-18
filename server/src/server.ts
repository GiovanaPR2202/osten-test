import express, {Response, Request} from 'express';
import cors from 'cors';
import Controllers from './controllers/controllers';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


const app = express();


const corsOptions = {
    origin: 'https://localhost:5050', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Exemplo',
        version: '1.0.0',
        description: 'Documentação da API de Exemplo',
      },
      servers: [
        {
          url: 'http://localhost:5050',
          description: 'Servidor de Desenvolvimento',
        },
      ],
    },
    apis: ["**/*.{ts,js"],
  };
  
const swaggerSpec = swaggerJsdoc(options);


app.use(Controllers)

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.listen(5050, ()=>{
    console.log("Server is Running in");
});