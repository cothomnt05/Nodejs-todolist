const List = require("../models/list");
const Item = require("../models/item");

const getList = async (req, res, next) => {
  const { listID } = req.params;
  const list = await List.findById(listID);

  return res.status(200).json({ list });
};

const getListItem = async (req, res, next) => {
  const { listID } = req.params;

  const list = await List.findById(listID).populate("items");
  return res.status(200).json(list.items);
};

const index = async (req, res, next) => {
  const lists = await List.find({});
  return res.status(200).json({ lists });
};

const newList = async (req, res, next) => {
  // console.log("req.body content ", req.body);
  const newList = new List(req.body);

  await newList.save();
  return res.status(201).json({ list: newList });
};

const newListItem = async (req, res, next) => {
  const { listID } = req.params;

  const newItem = new Item(req.body);

  const list = await List.findById(listID);

  newItem.list = list;

  await newItem.save();

  list.items.push(newItem._id);

  await list.save();

  return res.status(201).json({ item: newItem });
};

const replaceList = async (req, res, next) => {
  const { listID } = req.params;
  const newList = req.body;
  const result = await List.findByIdAndUpdate(listID, newList);

  return res.status(200).json({ success: true });
};

const updateList = async (req, res, next) => {
  const { listID } = req.params;
  const newList = req.body;
  const result = await List.findByIdAndUpdate(listID, newList);

  return res.status(200).json({ success: true });
};

module.exports = {
  getList,
  getListItem,
  index,
  newList,
  newListItem,
  replaceList,
  updateList,
};
