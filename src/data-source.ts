import { DataSource } from "typeorm"; 

export const AppDataSource = new DataSource({ 
type: "mysql",
host:"localhost",
username: "root",
password: "passwordsql",
port: 3306,
database:"test-inventarioapi",
synchronize: true,
logging: true,
entities: ["dist/models/**/*.js"],
subscribers: ["dist/subscribers/**/*.js"],
migrations:["dist/migrations/**/*.js"]
})