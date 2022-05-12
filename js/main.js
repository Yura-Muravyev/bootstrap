let studentsData = [];

function getForm(Data) {
  const FORM = document.forms.form;
  let fullName = `${FORM.elements.sureName.value}` + ' ' + `${FORM.elements.name.value}` + ' ' + `${FORM.elements.middleName.value}`;
  let startTraining = FORM.elements.startTraining.value
  let faculty = FORM.elements.faculty.value;
  let birthday = `${getBirthday(FORM.elements.birthday.valueAsDate)}` + ' ' +  `(${((new Date() - new Date(FORM.elements.birthday.valueAsDate)) / (24 * 3600 * 365.25 * 1000)) | 0 } лет)`;
    function createStudentObj() {
      let student = {
        fullName,
        startTraining,
        faculty,
        birthday,
      }
      Data.push(student);
      console.log(studentsData);
  }
  createStudentObj();
}

// TO DO
function getBirthday(date) {
  let res = date.toISOString().split('T')[0].split('-');
  let fres = res[2] + '.' +  res[1] + '.' + res[0];
  return fres
}


function drawTable (Data) {
  Data.forEach(item => {
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');
    tr.innerHTML =
        '<td>' + item.fullName +'</td>' + 
        '<td>' + item.faculty + '</td>' + 
        '<td>' + item.birthday + '</td>' + 
        '<td>' + item.startTraining + '</td>';
    tbody.appendChild(tr);
  });
}

  
const submit = document.querySelector('#form');
submit.addEventListener('submit', function (event) {
  event.preventDefault();
  getForm(studentsData);
  drawTable(studentsData);
});
