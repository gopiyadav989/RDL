import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  totalRatings: {
    type: Number,
    required: true
  }
}, {timestamps: true}
);

export default mongoose.model('Rating', ratingSchema);
