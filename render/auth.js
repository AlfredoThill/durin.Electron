
//-- Stop login form submit to nothingness and send params to main
function stopLogInform(evt) {
    evt.preventDefault();
    console.log('Se previno el submit')
    let params = new Object;
    let inputs = document.querySelectorAll('#login-form > input.form-input');
    for (let input of inputs.entries()) { params[input[1].name] = input[1].value }
    ipcRenderer.send('login-submitted',params)
}
// if login succesful
ipcRenderer.on('login-succesful', (event) => { 
    console.log('El render recibio los resultados')
    document.getElementById("template").innerHTML = ''; 
    document.querySelector('.sidenav').style.display = 'inline';
    document.querySelector('.content').style.marginLeft = '200px';
    console.log('El render mostro los resultados')
})
// if login failed
ipcRenderer.on('login-failed', (event) => { 
  console.log('El render recibio los resultados')
  document.getElementById('login-form').reset();
  document.getElementById("formWarning").style.display = "block";
  console.log('El render mostro los resultados')
})