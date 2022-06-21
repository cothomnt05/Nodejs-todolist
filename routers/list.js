const express = require("express");
const router = require("express-promise-router")();

const listController = require("../controllers/list");

router.route("/").get(listController.index).post(listController.newList);

router
  .route("/:listID")
  .get(listController.getList)
  .put(listController.replaceList)
  .patch(listController.updateList);

router
  .route("/:listID/items")
  .get(listController.getListItem)
  .post(listController.newListItem);

module.exports = router;
