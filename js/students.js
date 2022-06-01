
// массив студентов
let studentsList = [
    {name: "Владимир",
    middleName: "Николавеич",
    sureName: "Кубанов",
    fullName: "Кубанов Владимир Николавеич",
    teachStart: 2012,
    faculty: "Юридический",
    birthday: new Date(1994, 6, 9),
    },

    {name: "Петр",
    middleName: "Владимирович",
    sureName: "Смирнов",
    fullName: "Смирнов Петр Владимирович",
    teachStart: 2018,
    faculty: "Исторический",
    birthday: new Date(1993, 10, 25),
    },

    {name: "Игорь",
    middleName: "Борисович",
    sureName: "Мельников",
    fullName: "Мельников Игорь Борисович",
    teachStart: 2020,
    faculty: "Юридический",
    birthday: new Date(2000, 3, 9),
    },

    {name: "Иван",
    middleName: "Иванович",
    sureName: "Иванов",
    fullName: "Иванов Иван Иванович",
    teachStart: 2004,
    faculty: "Исторический",
    birthday: new Date(1988, 11, 25),
    },
]; 

// получаем форму и инпуты
const formAddStudent = document.getElementById('addStudent')
const AddStudentSurenameInp = document.getElementById('addStudent-surename')
const AddStudentNameInp = document.getElementById('addStudent-name')
const AddStudentMiddlenameInp = document.getElementById('addStudent-middlename')

// получаем заголовки таблицы
const $studentsListTable = document.getElementById('studentsListTR'), 
$studentsListTH = document.querySelectorAll('th');

// получаем тело таблицы
const $students_list = document.getElementById('students-list')

// вспомогательные переменные для определения по какому заголовку кликнули
let column = '', 
columnDir = true;

function checkFormAddStudent() {
    const addStudentSurenameInpVal = AddStudentSurenameInp.value.trim();
    const addStudentNameInpVal = AddStudentNameInp.value.trim();
    const addStudentMiddlenameInpVal = AddStudentMiddlenameInp.value.trim();

    if (addStudentSurenameInpVal === '') {
        setErrorForm(AddStudentSurenameInp, 'Введите фамилию')
    } else {
        setsuccessForm(AddStudentSurenameInp)
    }

    if (addStudentNameInpVal === '') {
        setErrorForm(AddStudentNameInp, 'Введите имя')
    } else {
        setsuccessForm(AddStudentNameInp)
    }

    if (addStudentMiddlenameInpVal === '') {
        setErrorForm(AddStudentMiddlenameInp, 'Введите отчество')
    } else {
        setsuccessForm(AddStudentMiddlenameInp)
    }

}
function setErrorForm (input, message) {
    const formControl = input.parentElement;
    const formInput = formControl.querySelector('.students-input')
    const textError = formControl.querySelector('.text-error');

    formInput.classList.add('error');
    textError.textContent = message;
}

function setsuccessForm(input) {
    const formControl = input.parentElement;
    const formInput = formControl.querySelector('.students-input')
    const textError = formControl.querySelector('.text-error');

    formInput.classList.remove('error');
    textError.textContent = '';
}


// Соединяем ФИО
function getFullName(name, middleName, sureName ) {
    const fullName = sureName + ' ' + name + ' ' + middleName;
    return fullName;
};

// Исправляем формат даты рождения
function getBirthday(dateBirthday) {
    let birthday = dateBirthday.toISOString().split('T')[0].split('-');
    let correctBirthday = birthday[2] + '.' +  birthday[1] + '.' + birthday[0];

    return correctBirthday;
};

function getAge(correctBirthday) {
    return ` (${((new Date() - new Date(correctBirthday)) / (24 * 3600 * 365.25 * 1000)) | 0 } лет)`;
};

// считаем закончил ли учиться или на каком курсе учится
function getStudyTime(startTraining) {
    let currentTime = new Date();

    if ((currentTime.getMonth() + 1 >= 9 && (currentTime.getFullYear() - startTraining > 4)) || (currentTime.getFullYear() - startTraining > 4) ) {
        return `${+startTraining} - ${+startTraining + 4} (закончил)`; 
    } else {
        return `${+startTraining} - ${+startTraining + 4} (${currentTime.getFullYear() - startTraining}-й курс)`;
    }
};

// получаем таблицу студентов
function newStudentTR(student) {
    const $studentTR = document.createElement('tr'),
        $fioTD = document.createElement('td'),
        $birthdayTD = document.createElement('td'),
        $facultyTD = document.createElement('td'),
        $teachStartTD = document.createElement('td')

    $fioTD.textContent = student['fullName']
    $birthdayTD.textContent = getBirthday(student['birthday']) + getAge(student['birthday']);
    $facultyTD.textContent = student['faculty'];
    $teachStartTD.textContent = getStudyTime(student['teachStart']);
    
    $studentTR.append($fioTD);
    $studentTR.append($birthdayTD);
    $studentTR.append($facultyTD);
    $studentTR.append($teachStartTD);

    return $studentTR;
};

// сортировка столбцов таблицы по параметрам
function sortedUsersList(arr, prop, dir) {
    const studentsListCopy = [...arr];
    return studentsListCopy.sort( (studentA,studentB) => {
        if (!dir ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]) 
        return -1;
    }); 
}

// отрисовка таблицы
function render(arr) {
    let studentsListCopy = [...arr];

    studentsListCopy = sortedUsersList(studentsList, column, columnDir);
    
    $students_list.innerHTML = '';
    for (const student of studentsListCopy) {
        $students_list.append(newStudentTR(student));
    }
};

// события клика по заголовкам таблицы для сортировки
$studentsListTH.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        columnDir = !columnDir
        render(studentsList);
    })
})

// Событие клика по конпки добавить студента
formAddStudent.addEventListener('submit', function (event) {
    event.preventDefault();
    checkFormAddStudent();
})

// // события кнопик фильтрации
// document.getElementById('filter-form').addEventListener('submit', function (event) {
//     event.preventDefault();
//     render(studentsList)
    
// })

render(studentsList);