
// массив студентов
let studentsList = [
    {name: "Юрий",
    middleName: "Николавеич",
    sureName: "Муравьёв",
    fullName: "Муравьёв Юрий Николавеич",
    teachStart: 2012,
    faculty: "Юридический",
    birthday: new Date(1994, 6, 9),
    },

    {name: "Петр",
    middleName: "Владимирович",
    sureName: "Смирнов",
    fullName: "Смирнов Петр Владимирович",
    teachStart: 2018,
    faculty: "Юридический",
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
    faculty: "Юридический",
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

// сортировка столбцов таблицы по параметрам
let column = '', 
columnDir = true;

function sortedUsersList(prop, dir) {
    const studentsListCopy = [...studentsList];
    return studentsListCopy.sort( (studentA,studentB) => {
        if (!dir ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]) 
        return -1;
    });
}

function getFilterInput() {
    const inputFioValueFilter = document.getElementById('filter-fio').value.toLowerCase();
    const inputBirthdayValueFilter = document.getElementById('filter-fio').valueAsDate;
    const inputFacultyValueFilter = document.getElementById('filter-fio').value.toLowerCase();
    const inputTeachStartValueFilter = document.getElementById('filter-fio').value.trim;

    return {
        inputFioValueFilter,
        inputBirthdayValueFilter,
        inputFacultyValueFilter,
        inputTeachStartValueFilter
    }
}

// фильтрация таблицы
function filterUsersList(prop, value) {
    let resultFilter = [];
    let studentsListCopy = [...studentsList];

    for (const item of studentsListCopy) {
        if ((item[prop]).includes(String(value)) === true) {
            resultFilter.push(item)
        } 
        
    }
    return resultFilter;
}

// отрисовка таблицы
function render() {
    let studentsListCopy = [...studentsList];
    studentsListCopy = sortedUsersList(column, columnDir);

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
        birthday: new Date(document.getElementById('input-birthday').valueAsDate),
};
    studentsList.push(newStudent);
    render();
})

// события клика по заголовкам таблицы для сортировки
$studentsListTH.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        columnDir = !columnDir
        render();
    })
})

// события кнопик фильтрации
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(filterUsersList('fullName', getFilterInput().inputBirthdayValueFilter));
    
})
render();