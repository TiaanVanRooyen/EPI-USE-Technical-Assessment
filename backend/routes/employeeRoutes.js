const express = require('express');
const router = express.Router();
const employee = require('../models/employee');
const makeTree = require('./module');

//Routes
  router.get('/employeeData/tree', async (req, res) => {
  try{
      const data = await employee.find();
      const tree = makeTree(data);
      res.json(tree);
  }catch (error){
      res.status(200).send('Issue');
      console.log(error);
  }
});

router.get('/employeeData', async (req, res) => {
  try{
    const data = await employee.find();
    res.json(data);
  }catch (error){
      res.status(200).send('Issue');
      console.log(error);
  }  
});

router.post('/employeeData', (req, res) => {
  const {_id, name, surname, DOB, Salary, Position, Email, Manager} = req.body;
  const newEmployee = new employee({
    _id,
    name,
    surname,
    DOB,
    Salary,
    Position,
    Email,
    Manager
  });

  newEmployee.save()
  .then(() => {
      res.status(200).json({ "Message" : "Record succesfully added" });
  }).catch(err => {
      res.status(500).json({ "Error" : err});
  });
});

router.put('/employeeData/:id', (req, res) => {
  const {_id, name, surname, DOB, Salary, Position, Email, Manager} = req.body;
  const changes = new employee({
    _id,
    name,
    surname,
    DOB,
    Salary,
    Position,
    Email,
    Manager
  });

  employee.findByIdAndUpdate(req.params.id, changes)
  .then(() => {
    res.status(200).json({"Message" : "Record was successfully updated."});
  }).catch(err => {
    res.status(500).json({"Error" : err});
  });
});

router.get('/employeeData/:id', async (req, res) => {
  const data = await employee.findById(req.params.id);
  res.json(data);
});

router.delete('/employeeData/:id', (req, res) => {
  employee.findByIdAndDelete(req.params.id)
  .then(async () => {
    await employee.deleteMany({Manager : req.params.id}); //Cascade delete to prevent orphan records
  })
  .then(() => {
      res.status(200).json({ "Message" : "Record successfully removed"});
  })
  .catch(err => {
      res.status(500).json({ "Error" : err });
  })
});
  
  module.exports = router;