const {ipcMain,app,BrowserWindow} = require('electron')
const stmBuilders = require('./Helpers/stmBuilder')
const query = require('./Helpers/run-query')

// Listen for "show-tables" buton, run query and send results to render  
ipcMain.on('show-tables', async (event) => {
 console.log('El main recivio la peticion')
 let html = await query('SHOW TABLES','results-table');
 console.log('Peticion resuelta')
 event.reply('tables-results', html)
 console.log('Respuesta enviada')
})
// Listen for "insert-form" submit, build query, run it and send results to render  
ipcMain.on('iform-submitted', async (event,params) => {
    console.log('El main recibio el submit')
    let table = 'main'; // made this input from render, pending
    let stm = stmBuilders.insert(params,table);
    let html = await query(stm,'results-object');
    console.log('Peticion resuelta')
    event.reply('insert-results', html)
    console.log('Respuesta enviada')
 })
// Listen for "select-all-form" submit, build query, run it and send results to render  
ipcMain.on('saform-submitted', async (event,param) => {
  console.log('El main recibio el submit')
  let table = param['table-name'];
  let html = await query('SELECT * FROM '+table+' LIMIT 10','results-table');
  console.log('Peticion resuelta')
  event.reply('select-results', html)
  console.log('Respuesta enviada')
})
// Listen for "select-where-form" submit, build query, run it and send results to render  
ipcMain.on('swform-submitted', async (event,params) => {
  console.log('El main recibio el submit')
  let table = params['table-name'];
  let dni = params['dni'];
  let html = await query('SELECT * FROM '+table+' WHERE dni = '+dni+' LIMIT 10','results-table');
  console.log('Peticion resuelta')
  event.reply('select-where-results', html)
  console.log('Respuesta enviada')
})
// Listen for "update-form" submit, build query, run it and send results to render  
ipcMain.on('uform-submitted', async (event,params) => {
  console.log('El main recibio el submit')
  let table = 'main'; // made this input from render, pending
  let stm = stmBuilders.update(params,table);
  let html = await query(stm,'results-object');
  console.log('Peticion resuelta')
  event.reply('update-results', html)
  console.log('Respuesta enviada')
})
// Listen for "delete-form" submit, build query, run it and send results to render  
ipcMain.on('dform-submitted', async (event,params) => {
  console.log('El main recibio el submit')
  let table = 'main'; // made this input from render, pending
  let html = await query('DELETE FROM '+table+' WHERE dni = '+params.dni,'results-object');
  console.log('Peticion resuelta')
  event.reply('delete-results', html)
  console.log('Respuesta enviada')
})