const invokeClient = require('./client')
// ------------------------- Single query runner -------------------------
let query = async function query(stm,resultkind) {
    const config = { host:'localhost', port: 3306, user: global.credentials.user, password: global.credentials.password, database:'electron' };
    const db = invokeClient(config);
     try {
      const query = await db.query(stm);
      let html = '';
       if (resultkind == 'results-table' && query.length > 0) { 
         html = buildTable(query) 
        }
       else if (resultkind == 'results-object') {
         html = buildObject(query)
        }
       else {
         html = '<h4>No hay resultados que coincidan con la busqueda.</h4>';
       } 
      return html
     } 
     catch (e) { 
       console.log(e);
       let error = new Object;
       error.code = e.code;
       error.sqlMessage = e.sqlMessage;
       let html = buildObject(error)
       return html
     }
     finally {
       console.log('Cierre conexion')
       await db.close();
     }
}
   // 1. Build html table based on query results
   function buildTable(array) {
     let keys = Object.keys(array[0])
     //.Define header row
     let header = '<tr>';
     for (let i = 0; i<keys.length; i++) {
         header = header + '<th>'+keys[i]+'</th>';
     }
     header = header + '</tr>';
     //.Define rows
     let rows = '';
     array.forEach(doc => {
         let values = Object.values(doc);
         let row = '<tr>';
         for (let i = 0; i<values.length; i++) {
             row = row + '<td>'+values[i]+'</td>';
         }
         row = row + '</tr>';
         rows = rows + row;
     });
     return header + rows
   }
   // 2. Build html based on query result object
   function buildObject(array) {
     let keys = Object.keys(array);
     let values = Object.values(array);
     let table = '';
     for (let i = 0; i<keys.length; i++) {
         key = '<th>'+keys[i]+'</th>';
         value = '<td>'+values[i]+'</td>';
         row = '<tr>'+key+value+'</tr>';
         table = table + row
     }
     return table
   }

module.exports = query;