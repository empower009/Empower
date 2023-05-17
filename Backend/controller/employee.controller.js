import Employee from "../modal/schema/employee.schema.js";
import { createAccessToken } from "./authentication.js";


export const createEmployeeController = async (request,response) => {
	const employee = request.body;
	try {
		const id = await Employee.findOne({}).sort({id : -1}).id || 100;
		const emp = await Employee({...employee , id : id + 1});
		await emp.setPassword(emp.password);
		await emp.save();
		response.status(201).json({ message : "successfylly created data in db"})
	} catch (error) {
		console.log(error);
		response.status(400).json({ message : "not able to create employee" ,error })
	}
}

export const verifyEmployeeController = async (request,response) => {
	const email = request.query.email;
	console.log(email)
	const emp = await Employee.findOne({ email : email});
	setTimeout(() => {
		if(emp) {
			return response.status(200).json({ isVerified : true, message : "email is valid"})
		} else {
			return response.status(200).json({ isVerified : false,message : "email is invalid"})
		}
	},2000)
}

export const employeeLoginController = async (request,response) => {
	const employeeCredentials = request.body;
	const employee = await Employee.findOne({ email : employeeCredentials.email },{ password : 1})
	const isMatching = await employee.comparePassword(employeeCredentials.password);
	if(isMatching) { 
		const employee = await Employee.findOne({ email : employeeCredentials.email },{ password : 0, _id : 0 , __v : 0})
		response.status(200).json({ isLoggedInSuccess : true, acces_token : createAccessToken(employeeCredentials) , data : employee});
	} else {
		response.status(400).json({ isLoggedInSuccess : false , message : "user credentials is miss matching"});
	}
}

export const sendAllEmployeeDetailes = async (request,response) => {
	const employees = await Employee.find({},{ password : 0 , _id : 0, __v : 0});
	response.status(200).json(employees);
}