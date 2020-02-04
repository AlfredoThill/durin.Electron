let array = { 
  'main-id': '1',
   name: 'Alfredo Jose',
   surname: 'Till' 
}

function updateOne(array,table) {
  let keys = Object.keys(array);
  let values = Object.values(array);
  let update = []; let id = '';
  for (let i=0 ; i<values.length; i++) {
   if (keys[i] == 'main-id') {
    id = values[i];
   }
   else {
    let string = keys[i]+' = "'+values[i]+'"';  
    update.push(string.toString())
   }   
  }
  update = update.join(',');
  let stm = 'UPDATE '+table+' SET '+update+' WHERE id = '+id;
  return stm
}

console.log(updateOne(array,'main'))