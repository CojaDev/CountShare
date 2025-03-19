import mongoose from "mongoose";

const { Schema } = mongoose;

// Comment Schema (supports nested replies)
const CommentSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userImage: {
    type: String,
    required: false,
    trim: true,
  },
  userId: {
    type: String,
    required: false,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  // Store array of user IDs who liked this comment
  likedBy: {
    type: [String],
    default: [],
  },
});

// Add replies as a subdocument after schema definition to avoid "this" reference issues
CommentSchema.add({
  replies: {
    type: [CommentSchema],
    default: [],
  },
});

// Countdown Schema
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
    default: "Arial",
  },
  textColor: {
    type: String,
    required: true,
    default: "#000000",
  },
  backgroundColor: {
    type: String,
    required: true,
    default: "#ffffff",
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
    default: "light",
  },
  customCSS: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
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
  comments: [CommentSchema], // Uses the CommentSchema to store comments & replies
});

const Countdowns =
  mongoose.models.Countdowns || mongoose.model("Countdowns", CountdownSchema);
export default Countdowns;
