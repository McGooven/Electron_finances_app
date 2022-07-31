const { BrowserWindow }=require('electron');
const {Founds} =require('../db/Founds');
const {db} =require('../db/database');

function create(event, title){
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title);
}

async function handleStream(event,e){
    let found=new Founds(e)
    const dbc = db.getConnection('Founds');
    const result = await dbc.insert(found);
    return result;
}

module.exports={
    create,
    handleStream
}