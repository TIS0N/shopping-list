// backend/controllers/listController.js
import ShoppingList from '../models/shoppingList.js';

// Create a new shopping list
export const createShoppingList = async (req, res) => {
  try {
    const { name, items, editors = [], viewers = [], archived = false } = req.body;

    if (!name || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'List name and items are required' });
    }

    const newList = new ShoppingList({
      name,
      items,
      editors,
      viewers,
      archived,
      userId: req.userId,
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating shopping list' });
  }
};

// Get all shopping lists for the authenticated user
export const getShoppingLists = async (req, res) => {
  try {
    const userId = req.userId;

    const lists = await ShoppingList.find({
      $or: [
        { userId }, // owner
        { editors: userId },
        { viewers: userId }
      ]
    });

      const enrichedLists = lists.map(list => {
      const totalItemsCount = list.items.length;
      const boughtItemsCount = list.items.filter(item => item.status === true).length;

      return {
        ...list.toObject(),
        totalItemsCount,
        boughtItemsCount
      };
    });

    res.status(200).json(enrichedLists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching shopping lists' });
  }
};

// Get a single shopping list by ID
export const getSingleShoppingList = async (req, res) => {
  try {
    const list = await ShoppingList.findOne({
      _id: req.params.id,
      $or: [
        { userId: req.userId },
        { editors: req.userId },
        { viewers: req.userId }
      ]
    });

    if (!list) {
      return res.status(404).json({ message: 'List not found or unauthorized' });
    }

    const totalItemsCount = list.items.length;
    const boughtItemsCount = list.items.filter(item => item.status === true).length;

    res.status(200).json({
      ...list.toObject(),
      totalItemsCount,
      boughtItemsCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching the shopping list' });
  }
};

// Update a shopping list
export const updateShoppingList = async (req, res) => {
  try {
    const { name, items, editors, viewers, archived } = req.body;

    const list = await ShoppingList.findOne({
      _id: req.params.id,
      $or: [
        { userId: req.userId },
        { editors: req.userId }
      ]
    });

    if (!list) {
      return res.status(404).json({ message: 'List not found or unauthorized' });
    }

    if (name !== undefined) list.name = name;
    if (Array.isArray(items)) {
      list.items = items.map(({ _id, ...rest }) => rest); // strip Mongo _id if coming from frontend
    }
    if (Array.isArray(editors)) list.editors = editors;
    if (Array.isArray(viewers)) list.viewers = viewers;
    if (typeof archived === 'boolean') list.archived = archived;

    await list.save();
    res.status(200).json(list);
  } catch (err) {
    console.error('Error updating shopping list:', err);
    res.status(500).json({ message: 'Error updating shopping list' });
  }
};

// Delete a shopping list
export const deleteShoppingList = async (req, res) => {
  try {
    const list = await ShoppingList.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!list) {
      return res.status(404).json({ message: 'List not found or unauthorized' });
    }

    res.status(200).json({ message: `List "${list.name}" successfully deleted` });
  } catch (err) {
    console.error('Error during delete operation:', err);
    res.status(500).json({ message: 'Error deleting list' });
  }
};
