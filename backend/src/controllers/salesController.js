import Sales from '../models/Sales.js';

export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find({});
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSale = async (req, res) => {
  try {
    const sale = new Sales(req.body);
    const createdSale = await sale.save();
    res.status(201).json(createdSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      Object.assign(sale, req.body);
      const updatedSale = await sale.save();
      res.json(updatedSale);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      await sale.remove();
      res.json({ message: 'Sale removed' });
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};