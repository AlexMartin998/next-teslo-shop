import mongoose, { Schema, model, Model } from 'mongoose';

import { IUser } from '@/interfaces';

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required!'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
    },

    // doc
    role: {
      type: String,
      enum: {
        values: ['admin', 'client'],
        message: '{VALUE} is not a valid role!',
        default: 'client',
        required: [true, 'Role is required!'],
      },
    },
  },

  { timestamps: true, versionKey: false }
);

const User: Model<IUser> = mongoose.models.User || model('User', UserSchema);

export default User;
