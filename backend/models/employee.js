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
employeeSchema.pre('findOneAndDelete', { document: true, query: false }, async function (next) {
  const employeeId = this.getFilter()._id;

  // Find and remove all employees with this employee as a manager
  await this.model('employees').deleteMany({ Manager: employeeId });
  console.log('here');
  // Continue with the remove operation
  next();
});
  
  // Create Mongoose model
  const employee = mongoose.model('employees', employeeSchema);

  module.exports = employee;