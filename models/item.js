const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Schema.Types.ObjectID,
    ref: "List",
  },
});

module.exports = mongoose.model("Item", ItemSchema);
