const studentsArray = [];

function getForm(data) {
let name = 'Юрий'
let age = 23;
let faculty = 'Филосовский';
    function setObj() {
        let student = {
            name,
            age,
            faculty,
        }
        data.push(student);
        console.log(studentsArray);
    }
    setObj();

}

getForm(studentsArray);