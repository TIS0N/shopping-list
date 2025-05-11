// backend/controllers/listController.js
import ShoppingList from '../models/ShoppingList.js';

// Get all shopping lists for the authenticated user
export const getShoppingLists = async (req, res) => {
  try {
    const lists = await ShoppingList.find({ user: req.userId }); // Fetch lists based on the userId in the token
    res.status(200).json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching shopping lists' });
  }
};

// Create a new shopping list
export const createShoppingList = async (req, res) => {
  try {
    const { name, items } = req.body;

    // Check if name is provided
    if (!name || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'List name and items are required' });
    }

    const newList = new ShoppingList({
      name,
      items,
      user: req.userId, // Associate the list with the logged-in user
    });
    await newList.save();

    res.status(201).json(newList); // Return the created list
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating shopping list' });
  }
};

// Delete a shopping list
export const deleteShoppingList = async (req, res) => {
  try {
    console.log('Attempting to delete:', req.params.id);
    console.log('Authenticated user:', req.userId);

    const list = await ShoppingList.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!list) {
        console.log('No matching list found to delete');
      return res.status(404).json({ message: 'List not found or unauthorized' });
    }

    console.log(`List "${list.name}" successfully deleted`);
    res.status(200).json({ message: `List "${list.name}" successfully deleted` });

  } catch (err) {
    console.error('Error during delete operation:', err);
    res.status(500).json({ message: 'Error deleting list' });
  }
};

// Get a single shopping list by ID
export const getSingleShoppingList = async (req, res) => {
  try {
    const list = await ShoppingList.findOne({ _id: req.params.id, user: req.userId });

    if (!list) {
      return res.status(404).json({ message: 'List not found or unauthorized' });
    }

    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching the shopping list' });
  }
};

// Update a shopping list
export const updateShoppingList = async (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Received ID:', req.params.id);
    console.log('Authenticated user:', req.userId);

    const { name, items } = req.body;

      // Remove _id from each item to prevent MongoDB update conflict
    const sanitizedItems = items.map(({ _id, ...rest }) => rest);

    const list = await ShoppingList.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { name, items: sanitizedItems },
      { new: true }
    );

    if (!name && (!items || !Array.isArray(items))) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    if (!list) {
      console.log('List not found or unauthorized');
      return res.status(404).json({ message: 'List not found or unauthorized' });
    }

    res.status(200).json(list);
  } catch (err) {
    console.error('Error updating shopping list:', err);
    res.status(500).json({ message: 'Error updating shopping list' });
  }
};
