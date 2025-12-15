const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    studentId: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },

    rollNumber: {
      type: String,
      required: true,
    },

    parentName: {
      type: String,
      required: true,
    },

    parentContact: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
