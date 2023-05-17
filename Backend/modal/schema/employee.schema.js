import { Schema,model } from 'mongoose';
import { compare , hash } from 'bcrypt';

const employeeSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  position: { type: String, required: true },
  password: { type: String , required: true },
  accessPolicy: { type: String },
  leavePolicy: { type: String },
  attendance: { type: Array, default: [] },
  attendancePolicy: { type: String },
  hireDate: { type: Date },
  project: { type: Array, default: [] },
  reportingManager: { type: Object, default: {} },
  isPermanent: { type: Boolean },
  lastModified: { type: Date },
  request: { type: Array, default: [] },
  notification: [{
    date: { type: Date },
    message: { type: String },
    path: { type: String }
  }],
  qualification: { type: Object, default: {} },
  avatar: { type: String},
  phone: { type: Number, required : true },
  email: { type: String, required : true },
  address: {
    zipcode: { type: Number, required : true },
    city: { type: String, required : true },
    street: { type: String, required : true },
    state: { type: String, required : true },
    country: { type: String, required : true },
  },
  dateOfBirth : {
	type : String,
	required : true
  }
});

employeeSchema.methods.setPassword = async function (plainPassword) {
	const saltRounds = 10;
	this.password = await hash(plainPassword,saltRounds);
}
employeeSchema.methods.comparePassword = async function (plainPassword) {
	return await compare(plainPassword,this.password);
}

const Employee = model('Employee', employeeSchema);

export default Employee;
