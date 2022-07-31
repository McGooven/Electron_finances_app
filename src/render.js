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
    const data = inputs;
    let obj= {};
    for (const e of data) {
        obj[e.getAttribute('name')] = e.value;
    }
    
    const conn = await window.electronAPI.stream(obj);
    console.log(conn);
})