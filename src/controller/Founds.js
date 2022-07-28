const { BrowserWindow }=require('electron');

function create(event, title){
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title);
}

async function handleStream(event,e){
    return [...e,'3'];
}

module.exports={
    create,
    handleStream
}