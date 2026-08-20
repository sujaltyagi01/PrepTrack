const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["DSA", "Development", "Aptitude", "Other"],
      default: "DSA",
    },

    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },

    notes: {
      type: String,
      default: "",
    },

     practiceCount: {
    type: Number,
    default: 0
},

      lastPracticed: {
    type: Date
},


practiceHistory: [
    {
        date: {
            type: Date,
            default: Date.now
        },

        note: {
            type: String,
            default: ""
        }
    }
],



  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", topicSchema);