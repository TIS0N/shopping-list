import mongoose from 'mongoose';

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // List name is required
    trim: true,      // Removes extra spaces from the string
  },
  items: [{
    name: {
      type: String,
      required: true,  // Item name is required
    },
    amount: {
      type: Number,
      required: true,  // Amount is required
      min: 0,          // Ensure positive values only
    },
    unit: {
      type: String,
      enum: ['kg', 'liters', 'pieces'],  // Allowed units for the item
      required: true,  // Unit is required
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    // Reference to the User model
    required: true, // A list must be associated with a user
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;
