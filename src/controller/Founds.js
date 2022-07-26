function create(event, title){
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    console.log(e);
    win.setTitle(title);
}

module.exports={
    create
}