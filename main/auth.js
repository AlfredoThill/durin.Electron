const {ipcMain,app,BrowserWindow} = require('electron')
const invokeClient = require('./Helpers/client')

// Listen for login
ipcMain.on('login-submitted', async (event,arg) => {
   try { 
    console.log('El main recibio el login')
    config = { host:'localhost', port: 3306, user: arg.user, password: arg.password, database:'electron' };
    const db = invokeClient(config);
    await db.query('SHOW TABLES');
    global.credentials = { user: arg.user, password: arg.password}
    event.reply('login-succesful')
    await db.close();
   }
   catch (e) { 
    console.log(e)
    event.reply('login-failed') 
   } 
})