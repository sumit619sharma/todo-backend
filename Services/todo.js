//get all items
const Todo = require("../Model/todo");
let getAllItems = async (userId, page = 1, pageSize = 5) => {
  try {
    const allItems  = await Todo.findAll({
      where: { AuthId: userId },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

  const count = await Todo.count({where: { AuthId: userId}})

    return {
      items: allItems,
      totalcount: count,
    };
  } catch (err) {
    throw err;
  }
};
module.exports = getAllItems;
