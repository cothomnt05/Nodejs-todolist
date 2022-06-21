const List = require("../models/list");
const Item = require("../models/item");

const getItem = async (req, res, next) => {
  const item = await Item.findById(req.params.itemID);
  console.log(req.params.itemID);
  return res.status(200).json({ item });
};

const deleteItem = async (req, res, next) => {
  const itemID = req.params.itemID;

  const item = await Item.findById(itemID);

  const listID = item.list;

  const list = await List.findById(listID);

  await item.remove();

  list.items.pull(item);
  await list.save();
  return res.status(200).json({ success: true });
};

const index = async (req, res, next) => {
  const items = await Item.find({});
  return res.status(200).json(items);
};

const newItem = async (req, res, next) => {
  const list = await List.findById(req.body.list);

  const item = req.body;
  delete item.list;

  item.list = list._id;
  const newItem = new Item(item);
  await newItem.save();

  list.items.push(newItem._id);
  await list.save();

  return res.status(201).json({ item: newItem });
};

const replaceItem = async (req, res, next) => {
  const itemID = req.params.itemID;
  const newItem = req.body;
  const result = await Item.findByIdAndUpdate(itemID, newItem);

  return res.status(200).json({ success: true });
};

const updateItem = async (req, res, next) => {
  const itemID = req.params.itemID;
  const newItem = req.body;
  const result = await Item.findByIdAndUpdate(itemID, newItem);

  return res.status(200).json({ success: true });
};

module.exports = {
  getItem,
  deleteItem,
  index,
  newItem,
  replaceItem,
  updateItem,
};
