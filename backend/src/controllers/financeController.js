import Finance from '../models/Finance.js';

export const getFinances = async (req, res) => {
  try {
    const finances = await Finance.find({});
    res.json(finances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFinanceById = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (finance) {
      res.json(finance);
    } else {
      res.status(404).json({ message: 'Finance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFinance = async (req, res) => {
  try {
    const finance = new Finance(req.body);
    const createdFinance = await finance.save();
    res.status(201).json(createdFinance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFinance = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (finance) {
      Object.assign(finance, req.body);
      const updatedFinance = await finance.save();
      res.json(updatedFinance);
    } else {
      res.status(404).json({ message: 'Finance record not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (finance) {
      await finance.remove();
      res.json({ message: 'Finance record removed' });
    } else {
      res.status(404).json({ message: 'Finance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};