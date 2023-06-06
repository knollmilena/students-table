const dateEducation = document.getElementById("dateEducation");
const dateBirth = document.getElementById("date");
const btnAdd = document.querySelector(".add__btn");
const searchBtn = document.getElementById("search__btn");
const allInput = document.querySelectorAll("input");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const lastNameInput = document.getElementById("lastName");
const facultyInput = document.getElementById("faculty");
const form = document.getElementById("form");
const tableWrap = document.querySelector(".table__wrap");
const fullnameFilter = document.querySelector(".fullname-filter");
const facultyFilter = document.querySelector(".faculty-filter");
const dateFilter = document.querySelector(".date-filter");
const dateEducationFilter = document.querySelector(".dateEducation-filter");
const tableHead = document.querySelector(".table-primary");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; // Месяца идут с 0, так что добавляем 1.
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;
dateEducation.setAttribute("max", today);
dateBirth.setAttribute("max", today);

const todayYear = Number(today.substring(0, 4));
const todayMonth = Number(today.substring(5, 7));
const todayDay = Number(today.substring(8, 10));

let listArray = [
  {
    id: 1,
    fio: "Кноль Милена Алексеевна",
    lastname: "Кноль",
    name: "Милена",
    surname: "Алексеевна",
    faculty: "Программирование в компьютерных системах",
    dateEducation: "2018.1.1",
    dateBirth: "2001.8.30",
  },
  {
    id: 2,
    fio: "Пригодин Алексей Владимирович",
    lastname: "Пригодин",
    name: "Алексей",
    surname: "Владимирович",
    faculty: "Журналистика",
    dateEducation: "2011.1.1",
    dateBirth: "1991.9.10",
  },
  {
    id: 3,
    fio: "Ткаченко Мария Александровна",
    lastname: "Ткаченко",
    name: "Мария",
    surname: "Александровна",
    faculty: "Изобразительное искусство",
    dateEducation: "2018.1.11",
    dateBirth: "1999.5.11",
  },
  {
    id: 4,
    fio: "Алевтина Мария Александровна",
    lastname: "Алевтина",
    name: "Мария",
    surname: "Александровна",
    faculty: "Изобразительное искусство",
    dateEducation: "2018.1.10",
    dateBirth: "1999.5.10",
  },
];

for (item of listArray) {
  createRowTable(item);
}


dateEducation.addEventListener("change", () => {
  const date = new Date(dateEducation);

});
function errorInput(input) {
  input.classList.add("is-invalid");
  input.classList.remove("input");
}
function deleteErrorInput(input) {
  input.classList.remove("is-invalid");
  input.classList.add("input");
}

function validation(input) {
  input.value = input.value.trim();
  if (input.value === "") {
    errorInput(input);
    return false;
  } else {
    deleteErrorInput(input);
    return true;
  }
}
function fullName() {
  let fullName = "";
  for (i = 0; i < 3; ++i) {
    fullName = fullName + " " + allInput[i].value;
  }
  return fullName;
}

function number(value) {
  const year = Number(value.substring(0, 4));
  const month = Number(value.substring(5, 7));
  const day = Number(value.substring(8, 10));
  let years = year + "." + month + "." + day;
  return years;
}
function Age(date) {
  const year = Number(date.substring(0, 4));
  const month = Number(date.substring(5, 7));
  const day = Number(date.substring(8, 10));

  let years = todayYear - year;
  if (month > todayMonth) {
    years--;
  }
  years = day + "." + month + "." + year + `(${years}лет/года)`;
  return years;

}

function yearOfStudy(date) {
  const yearValue = Number(date.substring(0, 4));
  const month = Number(date.substring(5, 7));
  const day = Number(date.substring(8, 10));
  const course = todayYear - yearValue;
  let years = todayYear - 4;
  string = "";
  if ((course >= 4) & (todayMonth >= 6)) {
    string = day + "." + month + "." + yearValue + " " + "(Закончил(а))";
  } else if (course !== 0 && course <= 4) {
    string = day + "." + month + "." + yearValue + `(${course} курс)`;
  } else if (course === 0 && course <= 4) {
    string = day + "." + month + "." + yearValue + "(1 курс)";
  }
  return string;

}
function getNewId(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) {
      max = item.id;
    }
  }
  return max + 1;
}

function createRowTable(obj) {
  const rowTable = document.createElement("tr");
  const thFullname = document.createElement("th");
  const thFaculty = document.createElement("th");
  const thBirthday = document.createElement("th");
  const thDateEducation = document.createElement("th");

  rowTable.classList.add("row-table");
  rowTable.id = `${obj.id}`;

  thFullname.classList.add("fullname");
  thFullname.textContent = obj.lastname + " " + obj.name + " " + obj.surname;

  thFaculty.classList.add("faculty");
  thFaculty.textContent = obj.faculty;

  thBirthday.classList.add("birthday");
  thBirthday.textContent = Age(obj.dateBirth);

  thDateEducation.classList.add("date-education");
  thDateEducation.textContent = yearOfStudy(obj.dateEducation);

  tableWrap.append(rowTable);
  rowTable.append(thFullname);
  rowTable.append(thFaculty);
  rowTable.append(thBirthday);
  rowTable.append(thDateEducation);
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (event.submitter === btnAdd) {
    let flag = false;
    for (i = 0; i < allInput.length; ++i) {
      valid = validation(allInput[i]);
      if (valid === flag && flag === false) {
        alert("Заполните все поля!");
        flag = true;
      }
    }
    if (valid === true && flag === false) {
      let newItemArray = {
        id: getNewId(listArray),
        fio: fullName(),
        lastname: lastNameInput.value,
        name: nameInput.value,
        surname: surnameInput.value,
        faculty: facultyInput.value,
        dateEducation: number(dateEducation.value),
        dateBirth: number(dateBirth.value),
      };

      listArray.push(newItemArray);
      createRowTable(newItemArray);
    }
  }

  if (event.submitter === searchBtn) {
    deleteStudents(tableWrap);
    let newArr = [];
    let key = "";
    
    if(nameInput.value !== ''){newArr = filter(listArray, "name", nameInput.value);}
    if(lastNameInput.value !== ''){newArr = filter(listArray, "lastname", lastNameInput.value);}
    if(surnameInput.value !== ''){newArr = filter(listArray, "surname", surnameInput.value);}
    if(dateEducation.value !== ''){newArr = filter(listArray, "dateEducation", number(dateEducation.value));}
    if(dateBirth.value !== ''){newArr = filter(listArray, "dateBirth", number(dateBirth.value));}
    if(facultyInput.value !== ''){newArr = filter(listArray, "faculty", facultyInput.value);}

    for (let i = 0; i < newArr.length; i++){
        createRowTable(newArr[i]);
    }
    
 
  }
});


function filter(objects, key, value, ) {
  let result = [];

  for (let i = 0; i < objects.length; i++) {
    if (objects[i][key] === value) {
      result.push(objects[i]);
    }
  }

  return result;
}

function deleteStudents(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
let flag = true;

tableHead.addEventListener("click", (ev) => {
  deleteStudents(tableWrap);
  let targetElem = "";
  if (ev.target === dateEducationFilter) {
    targetElem = "dateEducation";
  }

  if (ev.target === dateFilter) {
    targetElem = "dateBirth";
  }

  if (ev.target === facultyFilter) {
    targetElem = "faculty";
  }
  if (ev.target === fullnameFilter) {
    targetElem = "fio";
  }

  sorting(listArray, targetElem, flag);
  flag = !flag;
});

function sorting(obj, prop, flag) {
  let newArr = obj.slice().sort(function (a, b) {
    if (a[`${prop}`] < b[`${prop}`]) return -1;
  });

  if (flag) {
    for (let i = 0; i < obj.length; i++) {
      createRowTable(newArr[i]);
    }
    flag = false;
  } else {
    for (let i = 0; i < obj.length; i++) {
      createRowTable(obj[i]);
    }
    flag = true;
  }
}
