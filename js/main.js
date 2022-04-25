const studensData = [];


function setData (name, middleName, sureName) {
  let itemObj = {};
      itemObj.name = name,
      itemObj.middleName = middleName,
      itemObj.sureName = sureName,
  studensData.push(itemObj);
}

function serializeForm(formNode) {
  const { elements } = formNode;
  const data = Array.from(elements)
    .filter((item) => !!item.name);
  return data;
}

function validation(event) {
  event.preventDefault();

  const elemntFrom = serializeForm(document.querySelector('#form'))
  elemntFrom.forEach(item => {
    if (item.value.trim() === '') {
      item.style.border = '2px solid red'
      
    } else {
      
      setData(elemntFrom[0].value, elemntFrom[1].value, elemntFrom[2].value,) 
    }
    
  });
  console.log(studensData);
};


const submit = document.querySelector('#form');
submit.addEventListener('submit', validation);