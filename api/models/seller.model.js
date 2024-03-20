import mongoose from "mongoose";


const sellerProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String
  },
  companyLogo: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    }
  }
}, {timestamps: true}
);

export default mongoose.model('SellerProfile', sellerProfileSchema);
