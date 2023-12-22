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

  // Define a recursive function to delete descendants
  const deleteDescendants = async (id) => {
    // Find and remove all employees with this employee as a manager
    const descendants = await this.model.find({ Manager: id });

    for (const descendant of descendants) {
      await this.model.findOneAndDelete({ _id: descendant.id });
      await deleteDescendants(descendant._id);
    }
  };

  // Start recursive deletion
  await deleteDescendants(employeeId);

  // Continue with the remove operation
  next();
});
  
  // Create Mongoose model
  const employee = mongoose.model('employees', employeeSchema);

  module.exports = employee;