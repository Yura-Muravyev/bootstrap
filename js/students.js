
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

const $studentsListTable = document.getElementById('studentsListTR'), 
$studentsListTH = document.querySelectorAll('th');

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
const $students_list = document.getElementById('students-list')

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

// сортировка столбцов таблицы по параметрам
let column = '', 
columnDir = true;

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
    // studentsListCopy = filterUsersList(studentsListCopy, 'fullName', getFilterInput().inputFioValueFilter)
    studentsListCopy = filterUsersList(studentsListCopy, 'faculty', getFilterInput().inputFacultyValueFilter)
    studentsListCopy = filterUsersList(studentsListCopy, 'teachStart', getFilterInput().inputTeachStartValueFilter)
    studentsListCopy = filterUsersList(studentsListCopy, 'teachStart', getFilterInput().inputTeachFinishValueFilter)

    

    $students_list.innerHTML = '';
    for (const student of studentsListCopy) {
        $students_list.append(newStudentTR(student));
    }
};


// получаем данные из формы 
document.getElementById('addStudent').addEventListener('submit', function(event) {
    event.preventDefault();
    let newStudent = {
        name: document.getElementById('input-name').value,
        middleName: document.getElementById('input-middleName'),
        sureName: document.getElementById('input-sureName').value,
        fullName: getFullName(document.getElementById('input-sureName').value, document.getElementById('input-name').value, document.getElementById('input-middleName').value),
        teachStart: document.getElementById('input-startTraining').value,
        faculty: document.getElementById('input-faculty').value,
        birthday: new Date(document.getElementById('input-birthday').value),
    };
    console.log(new Date(document.getElementById('input-birthday').value));
    studentsList.push(newStudent);
    render(studentsList);
})

// события клика по заголовкам таблицы для сортировки
$studentsListTH.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        columnDir = !columnDir
        render(studentsList);
    })
})

// события кнопик фильтрации
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();
    render(studentsList)
    
})
render(studentsList);