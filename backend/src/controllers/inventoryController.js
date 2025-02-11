import Inventory from '../models/Inventory.js';

// Get all inventory items
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({});
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single inventory item
export const getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (inventory) {
      res.json(inventory);
    } else {
      res.status(404).json({ message: 'Inventory item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create inventory item
export const createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    const createdInventory = await inventory.save();
    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update inventory item
export const updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (inventory) {
      Object.assign(inventory, req.body);
      const updatedInventory = await inventory.save();
      res.json(updatedInventory);
    } else {
      res.status(404).json({ message: 'Inventory item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete inventory item
export const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (inventory) {
      await inventory.remove();
      res.json({ message: 'Inventory item removed' });
    } else {
      res.status(404).json({ message: 'Inventory item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};