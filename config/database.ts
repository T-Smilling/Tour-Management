import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,//Name database
  process.env.DATABASE_USERNAME,//UserName
  process.env.DATABASE_PASSWORD,//Password
  {
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
  }
);

sequelize.authenticate().then(()=>{
  console.log("Connect Success!");
}).catch((error)=>{
  console.error("Unable to connect to the database: ", error);
});

export default sequelize;
