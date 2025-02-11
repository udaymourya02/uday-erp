import Production from '../models/Production.js';

export const getProductions = async (req, res) => {
  try {
    const productions = await Production.find({});
    res.json(productions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductionById = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (production) {
      res.json(production);
    } else {
      res.status(404).json({ message: 'Production order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduction = async (req, res) => {
  try {
    const production = new Production(req.body);
    const createdProduction = await production.save();
    res.status(201).json(createdProduction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduction = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (production) {
      Object.assign(production, req.body);
      const updatedProduction = await production.save();
      res.json(updatedProduction);
    } else {
      res.status(404).json({ message: 'Production order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduction = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (production) {
      await production.remove();
      res.json({ message: 'Production order removed' });
    } else {
      res.status(404).json({ message: 'Production order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};