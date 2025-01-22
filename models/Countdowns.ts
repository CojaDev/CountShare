import mongoose from 'mongoose';

const { Schema } = mongoose;

const CountdownSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  font: {
    type: String,
    required: true,
    default: 'Arial',
  },
  textColor: {
    type: String,
    required: true,
    default: '#000000',
  },
  backgroundColor: {
    type: String,
    required: true,
    default: '#ffffff',
  },
  backgroundImage: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  fontSize: {
    type: Number,
    required: true,
    default: 48,
  },
  showSeconds: {
    type: Boolean,
    required: true,
    default: true,
  },
  showLabels: {
    type: Boolean,
    required: true,
    default: true,
  },
  enableNotifications: {
    type: Boolean,
    required: true,
    default: false,
  },
  notificationEmail: {
    type: String,
    required: false,
    trim: true,
  },
  theme: {
    type: String,
    required: true,
    default: 'light',
  },
  customCSS: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: true,
  },
  showWatermark: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Countdowns = mongoose.models.Countdowns || mongoose.model('Countdowns', CountdownSchema);
export default Countdowns;

