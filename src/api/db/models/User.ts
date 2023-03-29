import mongoose, { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '@/interfaces';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
      maxlength: [25, 'A user name must have less or equal than 25 characters'],
      minlength: [3, 'A user name must have less or equal than 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [50, 'A email must have less or equal than 50 characters'],
      minlength: [5, 'A email must have less or equal than 5 characters'],
    },

    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      // maxlength: [30, 'A password must have less or equal than 30 characters'],  // seed errors
      // minlength: [5, 'A password must have less or equal than 5 characters'],  // NextAuth errors

      // select: false,
    },

    // doc
    role: {
      type: String,
      enum: {
        values: ['admin', 'client', 'super-user'],
        message: '{VALUE} is not a valid role!',
        default: 'client',
        required: [true, 'Role is required!'],
      },
    },
  },

  { timestamps: true, versionKey: false }
);

UserSchema.pre('save', async function (next) {
  // If the pass is already hashed, it don't re-hashet it
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

const User: Model<IUser> = mongoose.models.User || model('User', UserSchema);

export default User;
