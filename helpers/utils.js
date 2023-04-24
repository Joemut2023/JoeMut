const getQuantityOfProduct = async (list, model) => {
  let qtyList = [];
  console.log("EXECUTE FONCTION");
  for (let index = 0; index < list.length; index++) {
    const quantiteInitial = await model.sum("qua_nbre", {
      where: {
        pro_id: list[index].pro_id,
      },
    });
    qtyList.push({
      id: list[index].pro_id,
      qty: quantiteInitial,
    });
  }
  return qtyList;
};

module.exports = { getQuantityOfProduct }
