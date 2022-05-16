
// массив студентов
let studentsList = [
    {name: "Юрий",
    middleName: "Николавеич",
    sureName: "Муравьёв",
    teachStart: 2012,
    faculty: "Юридический",
    birthday: new Date(1994, 6, 9),
    },

    {name: "Петр",
    middleName: "Владимирович",
    sureName: "Смирнов",
    teachStart: 2018,
    faculty: "Юридический",
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
    faculty: "Юридический",
    birthday: new Date(1988, 11, 25),
    },
]; 

const $studentsListTable = document.getElementById('studentsListTR'),
    $studentsListTH = document.querySelectorAll('th');

let column = 'fio'

// Соединяем ФИО
function getFullName(name, middleName, sureName ) {
    return sureName + ' ' + name + ' ' + middleName;
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

    $fioTD.textContent = getFullName(student['name'], student['middleName'], student['sureName']);
    $birthdayTD.textContent = getBirthday(student['birthday']) + getAge(student['birthday']);
    $facultyTD.textContent = student['faculty'];
    $teachStartTD.textContent = getStudyTime(student['teachStart']);
    
    $studentTR.append($fioTD);
    $studentTR.append($birthdayTD);
    $studentTR.append($facultyTD);
    $studentTR.append($teachStartTD);

    return $studentTR;
};



function getSortStudents(params) {
    
}

// отрисовка таблицы
function render() {
    const studentsListCopy = [...studentsList];

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
        middleName: document.getElementById('input-middleName').value,
        sureName: document.getElementById('input-sureName').value,
        teachStart: document.getElementById('input-startTraining').value,
        faculty: document.getElementById('input-faculty').value,
        birthday: new Date(document.getElementById('input-birthday').valueAsDate),
};
    studentsList.push(newStudent);

    render();
    console.log('rendr()');

})

$studentsListTH.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        render();
        console.log('rendr()');
    })
})
