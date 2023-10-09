const Todo = require("../Model/todo");
const getAllItems = require("../Services/todo");

const addItem = async (req, res) => {
  try {
    const title = req.body.title;
    const user = req.user;
    const page = req.query.page || 1;
    

    const tododata = await Todo.create({
      title: title,
      status: false,
      AuthId: user.id,
       });

    const { items, totalcount } = await getAllItems(user.id, page);
    res.status(200).json({
      todo: items,
      message: "new list.",
      totalcount: totalcount,
    });
  } catch (err) {
    res.status(500).json({ error: err, message: "failed" });  
      }
};

//get all items
const getAll = async (req, res,) => {
  try {
    const page = req.query.page || 1;
    const { items, totalcount } = await getAllItems(req.user.id, page);

    res
      .status(200)
      .json({ todo: items, message: "Retrieved all items.", totalcount });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err, message: "Failed to retrieve items." });
  }
};

//update

const updateItem = async (req, res, next) => {
  
  try {
    const itemId = req.query.id;
    const page = req.query.page || 1;
   console.log('before',req.body);
   const todoitem = await Todo.findOne({
    where : {id: itemId , AuthId: req.user.id}
   })
   
    const data = await todoitem.update({
      title: req.body.title,
      status: req.body.status,
      
    });
    

    const { items, totalcount } = await getAllItems(req.user.id, page);
    res.status(200).json({
      todo: items,
      message: "updated list.",
      totalcount: totalcount,
    });
    // res.status(200).json({ message: "Item updated successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err.message, message: "Failed to update item." });
  }
};

//delete

const deleteItem = async (req, res, next) => {
  // console.log("delete item");
  try {
    const itemId = req.query.id;
    const page = req.query.page || 1;
    const todoitem = await Todo.findOne({
      where : {id: itemId , AuthId: req.user.id}
     })
     
    await todoitem.destroy();
    
    const { items, totalcount } = await getAllItems(req.user.id, page);
    res.status(200).json({
      todo: items,
      message: "updated all items.",
      totalcount: totalcount,
    });
  } catch (err) {
    // console.log(err);
    res
      .status(500)
      .json({ error: err.message, message: "Failed to delete item." });
  }
};

module.exports = {
addItem,
deleteItem,
getAll,
updateItem,
}
