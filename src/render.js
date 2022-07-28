const saveButton = document.querySelector('#registroFondo button');
const streamButton = document.querySelectorAll('#registroFondo button')[1];
const inputs = document.querySelectorAll('#registroFondo > input');

saveButton.addEventListener('click',()=>{
    // console.log(inputs);
    const title = inputs[0].value;
    let va = window.electronAPI.setTitle(title);
})

streamButton.addEventListener('click', async()=>{
    const amount = inputs[1].value;
    const conn = await window.electronAPI.stream(amount,'1','2');
    console.log('enviaste: ', amount,'1','2');
    console.log('recibes: ', conn)
})