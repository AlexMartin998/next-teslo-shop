import mongoose, { Schema, model, Model } from 'mongoose';

import { IProduct } from '@/interfaces';

const ProductSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required!'], trim: true },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      trim: true,
    },
    images: [{ type: String }],
    inStock: {
      type: Number,
      required: [true, 'In Stock is required!'],
      default: 0,
    },
    price: { type: Number, required: [true, 'Price is required!'], default: 0 },

    // todo: relations - Aggregate Functions
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} is not a valid size!',
        },
      },
    ],

    slug: {
      type: String,
      required: [true, 'Slug is required!'],
      unique: true,
      trim: true,
    },
    tags: [{ type: String }],

    // todo: relations - Aggregate Functions
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} is not a valid type!',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} is not a valid gender!',
      },
    },
  },

  { timestamps: true, versionKey: false }
);

// idex
ProductSchema.index({ title: 'text', tags: 'text' });

// si ya existe el model usalo, sino crealo
const ProductModel: Model<IProduct> =
  mongoose.models.Product || model('Product', ProductSchema);

export default ProductModel;
