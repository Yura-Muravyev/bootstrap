
// массив студентов
let studentsList = [
    {name: "Владимир",
    middleName: "Николавеич",
    sureName: "Кубанов",
    teachStart: 2012,
    faculty: "Юридический",
    birthday: new Date(1994, 6, 9),
    },

    {name: "Петр",
    middleName: "Владимирович",
    sureName: "Смирнов",
    teachStart: 2018,
    faculty: "Исторический",
    birthday: new Date(1993, 10, 25),
    },

    {name: "Игорь",
    middleName: "Борисович",
    sureName: "Мельников",
    teachStart: 2020,
    faculty: "Юридический",
    birthday: new Date(2000, 3, 9),
    },

    {name: "Иван",
    middleName: "Иванович",
    sureName: "Иванов",
    teachStart: 2004,
    faculty: "Исторический",
    birthday: new Date(1988, 11, 25),
    },
]; 

// получаем форму и инпуты добавления студента
const formAddStudent = document.getElementById('addStudent')

const AddStudentSurenameInp = document.getElementById('addStudent-surename');
const AddStudentNameInp = document.getElementById('addStudent-name');
const AddStudentMiddlenameInp = document.getElementById('addStudent-middlename');
const AddStudentBirthdateInp = document.getElementById('addStudent-birthdate');
const AddStudentFacultyInp = document.getElementById('addStudent-faculty');
const AddStudentBeginningStudyInp = document.getElementById('addStudent-beginningStudy');

// получаем форму и инпуты филтрации
const formFilterStudent = document.getElementById('filterForm')

const FilterStudentFIOInp = document.getElementById('filterFIO');
const FilterStudentFacultyInp = document.getElementById('filterFaculty');
const FilterStudentBeginningStudyInp = document.getElementById('filterbeginningStudy');
const FilterStudentFinishStudyInp = document.getElementById('filterFinishStudy');

// получаем заголовки таблицы
const $studentsListTable = document.getElementById('studentsListTR'), 
$studentsListTH = document.querySelectorAll('th');

// получаем тело таблицы
const $students_list = document.getElementById('students-list')

// вспомогательные переменные для определения по какому заголовку кликнули
let column = '', 
columnDir = true;

// валидация полей ввода
function checkFormAddStudent() {

    let FLAGVALIDATION = 0;
    const addStudentSurenameInpVal = AddStudentSurenameInp.value.trim();
    const addStudentNameInpVal = AddStudentNameInp.value.trim();
    const addStudentMiddlenameInpVal = AddStudentMiddlenameInp.value.trim();
    const addStudentBirthdateInpVal = AddStudentBirthdateInp.valueAsDate;
    const addStudentFacultyInpVal = AddStudentFacultyInp.value.trim();
    const addStudentBeginningStudyInpVal = AddStudentBeginningStudyInp.value.trim();

    // проверки ФИО
    if (addStudentSurenameInpVal === '') {
        setErrorForm(AddStudentSurenameInp, 'Введите фамилию');
        FLAGVALIDATION++;
    } else {
        setsuccessForm(AddStudentSurenameInp)
    }
    if (addStudentNameInpVal === '') {
        setErrorForm(AddStudentNameInp, 'Введите имя');
        FLAGVALIDATION++;
    } else {
        setsuccessForm(AddStudentNameInp);
    }

    if (addStudentMiddlenameInpVal === '') {
        setErrorForm(AddStudentMiddlenameInp, 'Введите отчество');
        FLAGVALIDATION++;
    } else {
        setsuccessForm(AddStudentMiddlenameInp);
    }

    // Проверка даты рождения
    if (addStudentBirthdateInpVal === null) {
        setErrorForm(AddStudentBirthdateInp, 'Введите дату рождения');
        FLAGVALIDATION++;
    } else {
        setsuccessForm(AddStudentBirthdateInp);
    }
    

    // if (addStudentBirthdateInpVal === null) {
    //     setErrorForm(AddStudentBirthdateInp, 'Введите дату рождения');
    //     FLAGVALIDATION++;
    // } else {
    //     setsuccessForm(AddStudentBirthdateInp);
    // }
    // Проверка факультета
    if (addStudentFacultyInpVal === '') {
        setErrorForm(AddStudentFacultyInp, 'Введите факультет');
        FLAGVALIDATION++;
    } else {
        setsuccessForm(AddStudentFacultyInp);
    }
    // провыерка года начала обучения
    if (addStudentBeginningStudyInpVal === '') {
        setErrorForm(AddStudentBeginningStudyInp, 'Введите год начала обучения');
        FLAGVALIDATION++;
    } else {
        setsuccessForm(AddStudentBeginningStudyInp);
    }
    
    if (FLAGVALIDATION === 0) {
        const student  = 
            {name: addStudentNameInpVal,
            middleName: addStudentMiddlenameInpVal,
            sureName: addStudentSurenameInpVal,
            teachStart: addStudentBeginningStudyInpVal,
            faculty: addStudentFacultyInpVal,
            birthday: addStudentBirthdateInpVal,
            }
        studentsList.push(student);
        formAddStudent.reset();
        render(studentsList);
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

    $fioTD.textContent = getFullName(student['name'], student['middleName'], student['sureName'])  
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

// фильтрация по ФИО
function filterFIO(arr, inpFilterFIO) {
    const studentsListCopy = [...arr];
    const filterList = [];
    
    for (const student of studentsListCopy) {
        if (getFullName(student['name'], student['middleName'], student['sureName']).toLowerCase().trim().includes(inpFilterFIO.toLowerCase().trim())) {
            filterList.push(student);
        }
    }
    return filterList;
};

function filteFraculty(arr,inpFilterFaculty) {
    const studentsListCopy = [...arr];
    const filterList = [];
    
    for (const student of studentsListCopy) {
        if (student['faculty'].toLowerCase().trim().includes(inpFilterFaculty.toLowerCase().trim())) {
            filterList.push(student);
        }
    }
    return filterList;
};

function filtebeginningStudy(arr,inpStudentBeginning) {
    const studentsListCopy = [...arr];
    const filterList = [];
    
    for (const student of studentsListCopy) {
        if (toString(student['teachStart']).includes(toString(inpStudentBeginning))) {
            console.log(typeof toString(inpStudentBeginning) + ' sdfdsf');
            filterList.push(student);
        }
    }
    return filterList;
};

// отрисовка таблицы
function render(arr) {
    let studentsListCopy = [...arr];
    studentsListCopy = filterFIO(studentsList, FilterStudentFIOInp.value);
    studentsListCopy = sortedUsersList(studentsList, column, columnDir);
    
    // studentsListCopy = filteFraculty(studentsList, FilterStudentFacultyInp.value);
    // studentsListCopy = filtebeginningStudy(studentsList, FilterStudentBeginningStudyInp.value);
    console.log('object');
    
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
        console.log(columnDir);
        render(studentsList);
    })
})

// Событие клика по конпки добавить студента
formAddStudent.addEventListener('submit', function (event) {
    event.preventDefault();
    checkFormAddStudent();
})

// события кнопик фильтрации
document.getElementById('filterForm').addEventListener('submit', function (event) {
    event.preventDefault();
    render(studentsList)
    
})
render(studentsList);