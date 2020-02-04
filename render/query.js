const {ipcRenderer} = require('electron')
const fs = require('fs')

// ¡Modularize all this shieeet asap

//-- Tell main process to run the query and on response show results
const showtablesEvent = document.getElementById('show-tables')
showtablesEvent.addEventListener('click', () => {
  console.log('El render escucho el click')
  ipcRenderer.send('show-tables') 
  console.log('Peticion enviada')
})
ipcRenderer.on('tables-results', (event, arg) => { 
  console.log('El render recibio los resultados')
  const html = fs.readFileSync('./views/table.html', 'utf8')
  document.getElementById("template").innerHTML = html; 
  document.querySelector('table').innerHTML = arg;
  console.log('El render mostro los resultados')
})

//-- Stop insert form submit to nothingness, then tell main process to try the insert and on response show result
function stopIform(evt) {
  evt.preventDefault();
  console.log('Se previno el submit')
  let params = new Object;
  let inputs = document.querySelectorAll('#insert-form > input.form-input');
  for (let input of inputs.entries()) { params[input[1].name] = input[1].value }
  ipcRenderer.send('iform-submitted',params)
}
ipcRenderer.on('insert-results', (event, arg) => { 
  console.log('El render recibio los resultados')
  const html = fs.readFileSync('./views/table.html', 'utf8')
  document.getElementById("template").innerHTML = html; 
  document.querySelector('table').innerHTML = arg;
  console.log('El render mostro los resultados')
})

//-- Stop select all form submit to nothingness, then tell main process to try the insert and on response show result
function stopSAform(evt) {
  evt.preventDefault();
  console.log('Se previno el submit')
  let params = new Object;
  let inputs = document.querySelectorAll('#select-all-form > select');
  for (let input of inputs.entries()) { params[input[1].name] = input[1].value }
  ipcRenderer.send('saform-submitted',params)
}
ipcRenderer.on('select-results', (event, arg) => { 
  console.log('El render recibio los resultados')
  const html = fs.readFileSync('./views/table.html', 'utf8')
  document.getElementById("template").innerHTML = html; 
  document.querySelector('table').innerHTML = arg;
  console.log('El render mostro los resultados')
})

//-- Stop select w/ where form submit to nothingness, then tell main process to try the insert and on response show result
function stopSWform(evt) {
  evt.preventDefault();
  console.log('Se previno el submit')
  let params = new Object;
  let inputs = document.querySelectorAll('#select-where-form > .form-input');
  for (let input of inputs.entries()) { params[input[1].name] = input[1].value }
  ipcRenderer.send('swform-submitted',params)
}
ipcRenderer.on('select-where-results', (event, arg) => { 
  console.log('El render recibio los resultados')
  const html = fs.readFileSync('./views/table.html', 'utf8')
  document.getElementById("template").innerHTML = html; 
  document.querySelector('table').innerHTML = arg;
  console.log('El render mostro los resultados')
})

//-- Stop update form submit to nothingness, then tell main process to try the insert and on response show result
function stopUform(evt) {
  evt.preventDefault();
  console.log('Se previno el submit')
  let params = new Object;
  let checkboxes = document.querySelectorAll("#udpate-form > input[type=checkbox]");
  let inputs = document.querySelectorAll('#udpate-form > .form-input');
    for (let input of inputs.entries()) {
      if (input[1].id != "main-id") {
       for (let checkbox of checkboxes.entries()) {
        if (checkbox[1].value == input[1].id && checkbox[1].checked === true) {
         params[input[1].name] = input[1].value
        }
       }
      }
      else { params[input[1].name] = input[1].value } 
    }
  console.log(params)
  ipcRenderer.send('uform-submitted',params)
}
ipcRenderer.on('update-results', (event, arg) => { 
  console.log('El render recibio los resultados')
  const html = fs.readFileSync('./views/table.html', 'utf8')
  document.getElementById("template").innerHTML = html; 
  document.querySelector('table').innerHTML = arg;
  console.log('El render mostro los resultados')
})

//-- Stop delete form submit to nothingness, then tell main process to try the insert and on response show result
function stopDform(evt) {
  evt.preventDefault();
  console.log('Se previno el submit')
  let params = new Object;
  let input = document.getElementById("dni").value
  params["dni"] = input;
  console.log(params)
  ipcRenderer.send('dform-submitted',params)
}
ipcRenderer.on('delete-results', (event, arg) => { 
  console.log('El render recibio los resultados')
  const html = fs.readFileSync('./views/table.html', 'utf8')
  document.getElementById("template").innerHTML = html; 
  document.querySelector('table').innerHTML = arg;
  console.log('El render mostro los resultados')
})