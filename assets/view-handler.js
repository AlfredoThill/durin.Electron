// ¡Modularize all this shieeet asap

// Show the insert form, aka Insert the form template
const insertButon = document.getElementById('insert-form')
insertButon.addEventListener('click', () => {
  const html = fs.readFileSync('./views/iform.html', 'utf8')
  document.getElementById("template").innerHTML = html;
})

// Show the select all form, aka Insert the form template
const selectallButon = document.getElementById('select-form')
selectallButon.addEventListener('click', () => {
  const html = fs.readFileSync('./views/saform.html', 'utf8')
  document.getElementById("template").innerHTML = html;
})

// Show the select w/ condicional form, aka Insert the form template
const selectwhereButon = document.getElementById('select-where-form')
selectwhereButon.addEventListener('click', () => {
  const html = fs.readFileSync('./views/swform.html', 'utf8')
  document.getElementById("template").innerHTML = html;
})

// Show the update form, aka Insert the form template
const updateButon = document.getElementById('update-form')
updateButon.addEventListener('click', () => {
  const html = fs.readFileSync('./views/uform.html', 'utf8')
  document.getElementById("template").innerHTML = html;
  let checkboxes = document.querySelectorAll("#udpate-form > input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      let id = checkbox.getAttribute('value').toString();
      let label = checkbox.getAttribute('label-id').toString();
      if(checkbox.checked) {
        document.getElementById(label).style.display = "inline";
        document.getElementById(id).style.display = "inline";
        document.getElementById(id).required = true;
      } else {
        document.getElementById(label).style.display = "none";
        document.getElementById(id).style.display = "none";
        document.getElementById(id).required = false;
      }
    });
  });
})

// Show the update form, aka Insert the form template
const deleteButon = document.getElementById('delete-form')
deleteButon.addEventListener('click', () => {
  const html = fs.readFileSync('./views/dform.html', 'utf8')
  document.getElementById("template").innerHTML = html;
})