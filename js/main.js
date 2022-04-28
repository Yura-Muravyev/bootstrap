(function () {
  let studentsData = [];
  
  if (localStorage.getItem('student')) {
    studentsData = JSON.parse(localStorage.getItem('student'));
    studentsData.forEach(item => {
      let tbody = document.querySelector('tbody');
      let tr = document.createElement('tr');
      tr.innerHTML =
          '<td>' + item.sureName+ ' ' + item.name + ' ' + item.middleName +'</td>' + 
          '<td>' + item.faculty + '</td>' + 
          '<td>' + item.birthday + '</td>' + 
          '<td>' + item.startTraining + '</td>';
      tbody.appendChild(tr);
    });
  }
  
    
  function getLS(data) {
    localStorage.setItem('student', JSON.stringify(data));
  }


  function getForm() {
    const FORM = document.forms.form;
    let sureName = FORM.elements.sureName.value;
    let name = FORM.elements.name.value;
    let middleName = FORM.elements.middleName.value;
    let startTraining = FORM.elements.startTraining.value
    let faculty = FORM.elements.faculty.value;
    
    let age = ((new Date().getTime() - new Date(FORM.elements.birthday.valueAsDate)) / (24 * 3600 * 365.25 * 1000)) | 0;
    let birthday = FORM.elements.birthday.valueAsDate.getDate() + '.' + FORM.elements.birthday.valueAsDate.getMonth()  + '.' + FORM.elements.birthday.valueAsDate.getFullYear();

    return {
      sureName,
      name,
      middleName,
      startTraining,
      faculty,
      age,
      birthday
    }
  }


  function createStudentObj(data) {
    const studentDate = getForm();
    let user = {
      sureName: studentDate.sureName,
      name: studentDate.name,
      middleName: studentDate.middleName,
      faculty: studentDate.faculty,
      age: studentDate.age,
      birthday: studentDate.birthday,
      startTraining: studentDate.startTraining,
    }
    data.push(user);
    return user
  }
  
  function addStudentsTable() { 
    let user = createStudentObj();
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');
    tr.innerHTML =
        '<td>' + user.sureName+ ' ' + user.name + ' ' + user.middleName +'</td>' + 
        '<td>' + user.faculty + '</td>' + 
        '<td>' + user.birthday + ` ${user.age}` + '</td>' + 
        '<td>' + user.startTraining + '</td>';
    tbody.appendChild(tr);
  }
  
  
  const submit = document.querySelector('#form');
  submit.addEventListener('submit', function (event) {
    event.preventDefault();
  
    createStudentObj(studentsData);
    getLS(studentsData);
    addStudentsTable();
  });
})()