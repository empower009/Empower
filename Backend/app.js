import express from 'express';
import cors from 'cors';
import employeeRouter from './router/employee.router.js';

const app = express();


app.use(express.json());

app.use(cors({
	origin : ["http://localhost:3000","http://localhost:3001","http://localhost:3002"]
}));

app.use("/employee",employeeRouter)

export default app;