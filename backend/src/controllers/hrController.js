import HR from '../models/HR.js';

export const getEmployees = async (req, res) => {
  try {
    const employees = await HR.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await HR.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const employee = new HR(req.body);
    const createdEmployee = await employee.save();
    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await HR.findById(req.params.id);
    if (employee) {
      Object.assign(employee, req.body);
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await HR.findById(req.params.id);
    if (employee) {
      await employee.remove();
      res.json({ message: 'Employee removed' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};