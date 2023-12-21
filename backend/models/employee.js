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
      required: false,
      validate: {
        validator: function (value) {
          // Custom validator function
          return value !== this.EmployeeNo;
        },
        message: 'An employee cannot be his/her own manager.',
      }
    }
});
  
  // Create Mongoose model
  const employee = mongoose.model('employees', employeeSchema);

  module.exports = employee;