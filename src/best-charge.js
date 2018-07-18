function bestCharge(selectedItems) {
  let res = "";
  res += '============= 订餐明细 =============';

  all_item = loadAllItems();
  all_promo = loadPromotions();
  
  let dish_datamap = new Map();
  all_item.forEach(element => {
    dish_datamap.set(element['id'], element);
  });

  half_dish_list = all_promo['items'];

  let dish_list = new Map();
  selectedItems.forEach(element => {
    let splited = element.split(' x ');
    dish_list.set(splited[0], splited[1])
  });

  let all_price = 0;
  Array.from(dish_list.keys()).forEach(element => {
    let price = dish_list.get(element)*dish_datamap.get(element)['price'];
    res += '\n' + dish_datamap.get(element)['name'] + ' x ' + dish_list.get(element) + ' = ' +
     price + '元';

     all_price += price;
  });

  //res += '\n-----------------------------------';

  res += '\n-----------------------------------\n总计：'
  res += all_price + '元';

  return res;
}
