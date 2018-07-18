function bestCharge(selectedItems) {
  let res = "";
  res += '============= 订餐明细 =============';

  all_item = loadAllItems();
  all_promo = loadPromotions();
  
  let dish_datamap = new Map();
  all_item.forEach(element => {
    dish_datamap.set(element['id'], element);
  });

  half_dish_list = all_promo[1]['items'];

  let dish_list = new Map();
  selectedItems.forEach(element => {
    let splited = element.split(' x ');
    dish_list.set(splited[0], splited[1])
  });

  let all_price = 0;
  let prom_price = 0;
  let prom1_price = 0;
  let prom2_price = 0;
  let prom2_dishs = new Array();

  Array.from(dish_list.keys()).forEach(element => {
    let price = dish_list.get(element)*dish_datamap.get(element)['price'];
    res += '\n' + dish_datamap.get(element)['name'] + ' x ' + dish_list.get(element) + ' = ' +
     price + '元';

     all_price += price;
  });

  Array.from(dish_list.keys()).forEach(element => {
    if(half_dish_list.includes(element)) {
      prom2_price += dish_list.get(element)*dish_datamap.get(element)['price'] / 2;
      prom2_dishs.push(dish_datamap.get(element)['name']);
    }
  });

  if(all_price >= 30) {
    prom1_price = 6;
  }

  if(prom1_price > 0 || prom2_price > 0) {
    res += '\n-----------------------------------\n使用优惠:\n';
    if(prom1_price >= prom2_price) {
      prom_price = prom1_price;
      res += '满30减6元，省6元';
    } else {
      prom_price = prom2_price;
      res += '指定菜品半价(' + prom2_dishs.join('，') + ')，省' +prom2_price + '元';
    }
  }




  res += '\n-----------------------------------\n总计：'
  res += all_price-prom_price + '元';

  return res;
}
