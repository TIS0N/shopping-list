import mongoose from 'mongoose';

const shoppingListSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  items: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    unit: { type: String, enum: ['kg', 'liters', 'pieces'], required: true },
    status: {type: Boolean, default: false}, // Bought or not yet bought
    importance: {type: Boolean, default: false}, // Important item or not 
  }],
  userId: { type: String, required: true }, // Owner of the list/by whom the list was created
  archived: { type: Boolean, default: false }, // List is defaulty set as not archived upon creation
  editors: [{ type: String }], // Optional editors
  viewers: [{ type: String }], // Optional viewers
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;
