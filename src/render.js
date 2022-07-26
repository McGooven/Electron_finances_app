const saveButton = document.querySelector('#registroFondo button');
const inputs = document.querySelectorAll('#registroFondo > input');

saveButton.addEventListener('click',()=>{
    // console.log(inputs);
    const title = inputs[0].value;
    window.electronAPI.setTitle(title);
})