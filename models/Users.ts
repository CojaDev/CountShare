import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  bio: {
    type: String,
    required: false,
    trim: true,
  },
  countdowns: {
    type: String,
    required: false,
    trim: true,
  },
  pfp: {
    type: String,
    required: false,
    trim: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },

});

const Users =
  mongoose.models.Users || mongoose.model('Users', UserSchema);
export default Users;
