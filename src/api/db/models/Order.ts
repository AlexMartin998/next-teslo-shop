import { IOrder } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';

const OrderSchema = new Schema(
  {
    // relations
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required!'],
    },

    // TODO: other doc
    orderItems: [
      {
        // id must not be modifiable
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'ID required!'],
        },

        title: { type: String, required: [true, 'Title required!'] },
        size: { type: String, required: [true, 'Size required!'] },
        quantity: { type: String, required: [true, 'Quantity required!'] },
        slug: { type: String, required: [true, 'Slug required!'] },
        image: { type: String, required: [true, 'Image required!'] },

        // price at time of purchase
        price: { type: Number, required: [true, 'Price required!'] },
      },
    ],

    // TODO: other doc
    shippingAddress: {
      firstName: { type: String, required: [true, 'FirstName required!'] },
      lastName: { type: String, required: [true, 'LastName required!'] },
      address: { type: String, required: [true, 'Address required!'] },
      address2: { type: String },
      city: { type: String, required: [true, 'City required!'] },
      zipCode: { type: String, required: [true, 'ZipCode required!'] },
      country: { type: String, required: [true, 'Country required!'] },
      phone: { type: String, required: [true, 'Phone required!'] },
    },

    // TODO: other doc
    orderSummary: {
      numberOfItems: {
        type: Number,
        required: [true, 'NumberOfItems required!'],
      },
      subTotal: { type: Number, required: [true, 'SubTotal required!'] },
      tax: { type: Number, required: [true, 'Tax required!'] },
      total: { type: Number, required: [true, 'Total required!'] },
    },

    isPaid: { type: Boolean, require: [true, 'isPaid required!'] },
    paidAt: { type: String },

    transactionId: { type: String },
  },

  { timestamps: true, versionKey: false }
);

const Order: Model<IOrder> =
  mongoose.models.Order || model('Order', OrderSchema);

export default Order;
