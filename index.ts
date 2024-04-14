import express, {Express,Request,Response} from "express";
import moment from "moment";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import sequelize from "./config/database";
dotenv.config();
//Conect database
sequelize;

const app:Express = express();
const port:number|string=process.env.PORT||3000;

app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static("public"));
//bodyParser
app.use(bodyParser.json());
//End bodyParser

//APP LOCAL VARIABLE
app.locals.moment=moment;
//END APP LOCAL VARIABLE

app.get("/tours",(req:Request,res:Response) =>{
  res.render("client/pages/tours/index");
});

app.listen(port,()=>{
  console.log(`App listening on port ${port}`);
});