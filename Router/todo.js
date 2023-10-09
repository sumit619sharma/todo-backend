const express = require("express");
const router = express.Router();
const {addItem,getAll , updateItem,deleteItem} = require("../Controller/todo");
const {tokenValidation} = require('../Controller/auth')

router.post("/", tokenValidation,addItem);

router.get("/", tokenValidation, getAll);
router.patch("/", tokenValidation, updateItem);
router.delete("/", tokenValidation, deleteItem);
module.exports = router;
