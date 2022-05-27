
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

// получаем форму добавления студента
const formAddStudent = document.getElementById('addStudent');

// получаем занчения input
let studentsInput = document.querySelectorAll('.students-input');
studentsInputBirthday = document.querySelector('.students-input__birthday'),
studentsInputStartTraining = document.querySelector('.students-input__startTraining');

// получаем заголовки таблицы
const $studentsListTable = document.getElementById('studentsListTR'), 
$studentsListTH = document.querySelectorAll('th');

// получаем тело таблицы
const $students_list = document.getElementById('students-list')

// вспомогательные переменные для определения по какому заголовку кликнули
let column = '', 
columnDir = true;

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

function getFilterInput() {
    const inputFioValueFilter = document.getElementById('filter-fio').value.toLowerCase().trim();
    const inputFacultyValueFilter = document.getElementById('filter-faculty').value.toLowerCase().trim();
    const inputTeachStartValueFilter = document.getElementById('filter-teachStart').value.trim();
    const inputTeachFinishValueFilter = document.getElementById('filter-teachFinish').value.trim();

    return {
        inputFioValueFilter,
        inputTeachFinishValueFilter,
        inputFacultyValueFilter,
        inputTeachStartValueFilter
    }
}


function validationEmpetyInpust (inputs) {
    inputs.forEach ((input) => {    
        if (input.value.trim() === '') {
            input.classList.add('error')
            return false
        } else {
            input.classList.remove('error')
        }
    })
}

function validationBirthdayInput(inputs) {
    const today = new Date();
    if (inputs.value !== '') {
        if (getBirthday(inputs.valueAsDate) < '01.01.1900' || getBirthday(inputs.valueAsDate) > getBirthday(today)) {
            studentsInputBirthday.classList.add('error')
            alert('Введите корректную дату');
            return false
        }
    }
}

function validationTeachStartInput(inputs) {
    const todayYear = new Date();
    if (inputs.value !== '') {
        if (getBirthday(inputs.valueAsDate) < '01.01.1900' || getBirthday(inputs.valueAsDate) > getBirthday(today)) {
            studentsInputBirthday.classList.add('error')
            alert('Введите корректную дату');
            return false
        }
    }
}

// сортировка столбцов таблицы по параметрам
function sortedUsersList(arr, prop, dir) {
    const studentsListCopy = [...arr];
    return studentsListCopy.sort( (studentA,studentB) => {
        if (!dir ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]) 
        return -1;
    }); 
}

function filterFIO(arr, seaObj) {
    let res = []
    ListCopy = [...arr];
    ListCopy.forEach(elem => {
        let entries = Object.entries(elem);

        for (let [key, value] of entries) {
            if (String(value).toLocaleLowerCase().includes(seaObj)) {
                if (res.includes(elem)){
                } else {
                    res.push(elem)
                }
            }
       }
    })
    return res
}


// фильтрация таблицы
function filterUsersList(arr, prop, value) {
    let resultFilter = [];
    let studentsListCopy = [...arr];

    for (let item of studentsListCopy) {
        if (String(item[prop]).toLowerCase().includes(String(value))) {
            resultFilter.push(item);
        }
    }
    return resultFilter
    
}

// отрисовка таблицы
function render(arr) {
    let studentsListCopy = [...arr];

    studentsListCopy = sortedUsersList(studentsList, column, columnDir);

    studentsListCopy = filterFIO(studentsListCopy, getFilterInput().inputFioValueFilter)
    studentsListCopy = filterUsersList(studentsListCopy, 'faculty', getFilterInput().inputFacultyValueFilter)
    studentsListCopy = filterUsersList(studentsListCopy, 'teachStart', getFilterInput().inputTeachStartValueFilter)
    studentsListCopy = filterUsersList(studentsListCopy, 'teachStart', getFilterInput().inputTeachFinishValueFilter)
    
    $students_list.innerHTML = '';
    for (const student of studentsListCopy) {
        $students_list.append(newStudentTR(student));
    }
};

function handleFormSubmit(event) {
    event.preventDefault();
    
    validationEmpetyInpust(studentsInput)
    validationBirthdayInput(studentsInputBirthday)
    
}

// события клика по заголовкам таблицы для сортировки
$studentsListTH.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        columnDir = !columnDir
        render(studentsList);
    })
})

// Событие клика по конпки добавить студента
formAddStudent.addEventListener('submit', handleFormSubmit)

// события кнопик фильтрации
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();
    render(studentsList)
    
})
render(studentsList);