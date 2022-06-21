const express = require("express");
const router = require("express-promise-router")();

const itemController = require("../controllers/item");

router.route("/").get(itemController.index).post(itemController.newItem);

router
  .route("/:itemID")
  .get(itemController.getItem)
  .put(itemController.replaceItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
