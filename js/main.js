const studensData = [];

function addUserTable() {
  event.preventDefault();
  const user = setForm();
  let tbody = document.querySelector('tbody');
  let tr = document.createElement('tr');
  tr.innerHTML =
      '<td>' + user.sureName + ' ' + user.name + ' ' + user.middleName +'</td>' + 
      '<td>' + user.faculty + '</td>' + 
      '<td>' + user.birthday.toLocaleDateString() + '</td>' + 
      '<td>' + user.startTraining + '</td>';
      tbody.appendChild(tr);
      studensData.push(user);
      console.log(studensData);
}


function setForm() {
  const FORM = document.forms.form;
  let user = {
    sureName: FORM.elements.sureName.value,
    name: FORM.elements.name.value,
    middleName: FORM.elements.middleName.value,
    faculty: FORM.elements.faculty.value,
    birthday: new Date(FORM.elements.birthday.value),
    startTraining: FORM.elements.startTraining.value,
  }
  return user;
}

const submit = document.querySelector('#form');
submit.addEventListener('submit', addUserTable);