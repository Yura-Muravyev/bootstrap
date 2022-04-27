const studensData = [];



function timeСalculation(birthday) {
  let
}

function addUserTable() {
  let tbody = document.querySelector('tbody');

  for(var i = 0; i < studensData.length; i++) {
    let tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + studensData[i].sureName + ' ' + studensData[i].name + ' ' + studensData[i].middleName +'</td>' + 
      '<td>' + studensData[i].faculty + '</td>' + 
      '<td>' + +studensData[i].birthday.toLocaleDateString() + '</td>' + 
      '<td>' + studensData[i].startTraining + '</td>'; 
    tbody.appendChild(tr);
  }
}


function setForm() {
  event.preventDefault();
  const FORM = document.forms.form;
  let user = {
    sureName: FORM.elements.sureName.value,
    name: FORM.elements.name.value,
    middleName: FORM.elements.middleName.value,
    faculty: FORM.elements.faculty.value,
    birthday: new Date(FORM.elements.birthday.value),
    startTraining: FORM.elements.startTraining.value,
  }
  
  timeСalculation(user.birthday);

  studensData.push(user);
}

const submit = document.querySelector('#form');
submit.addEventListener('submit', setForm);