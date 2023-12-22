const mongoose = require('mongoose');

// Define Mongoose schema
const employeeSchema = new mongoose.Schema({
    _id : String,
    name : String,
    surname : String,
    DOB : String,
    Salary : Number,
    Position : String,
    Email : String,
    Manager : {
      type: String,
      default : null
    }
});

// Cascade delete pre hook
employeeSchema.pre('findOneAndDelete', async function (next) {
  const employeeId = this.getFilter()._id;

  console.log('here');
  // Find and remove all employees with this employee as a manager
  await this.model('employees').deleteMany({ Manager: employeeId });

  // Continue with the remove operation
  next();
});
  
  // Create Mongoose model
  const employee = mongoose.model('employees', employeeSchema);

  module.exports = employee;