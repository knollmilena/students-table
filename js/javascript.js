(() => {
  const dateEducation = document.getElementById('dateEducation');
  const dateBirth = document.getElementById('date');
  const btnAdd = document.querySelector('.add__btn');
  const searchBtn = document.getElementById('search__btn');
  const allInput = document.querySelectorAll('input');
  const nameInput = document.getElementById('name');
  const surnameInput = document.getElementById('surname');
  const lastNameInput = document.getElementById('lastName');
  const facultyInput = document.getElementById('faculty');
  const form = document.getElementById('form');
  const tableWrap = document.querySelector('.table__wrap');
  const fullnameFilter = document.querySelector('.fullname-filter');
  const facultyFilter = document.querySelector('.faculty-filter');
  const dateFilter = document.querySelector('.date-filter');
  const dateEducationFilter = document.querySelector('.dateEducation-filter');
  const tableHead = document.querySelector('.table-primary');
  let flag = true;
  let date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const maxDateBirth = `${yyyy - 15}-${mm}-${dd}`;

  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  date = `${yyyy}-${mm}-${dd}`;
  dateEducation.setAttribute('max', date);
  dateBirth.setAttribute('max', maxDateBirth);

  const listArray = [
    {
      id: 1,
      fio: 'Кноль Милена Алексеевна',
      lastname: 'Кноль',
      name: 'Милена',
      surname: 'Алексеевна',
      faculty: 'Программирование в компьютерных системах',
      dateEducation: '2018.01.01',
      dateBirth: '2001.08.30',
    },
    {
      id: 2,
      fio: 'Пригодин Алексей Владимирович',
      lastname: 'Пригодин',
      name: 'Алексей',
      surname: 'Владимирович',
      faculty: 'Журналистика',
      dateEducation: '2011.01.01',
      dateBirth: '1991.09.10',
    },
    {
      id: 3,
      fio: 'Ткаченко Мария Александровна',
      lastname: 'Ткаченко',
      name: 'Мария',
      surname: 'Александровна',
      faculty: 'Изобразительное искусство',
      dateEducation: '2018.01.11',
      dateBirth: '1999.05.11',
    },
    {
      id: 4,
      fio: 'Алевтина Мария Александровна',
      lastname: 'Алевтина',
      name: 'Мария',
      surname: 'Александровна',
      faculty: 'Изобразительное искусство',
      dateEducation: '2018.01.10',
      dateBirth: '1999.05.10',
    },
  ];

  function errorInput(input) {
    input.classList.add('is-invalid');
    input.classList.remove('input');
  }
  function deleteErrorInput(input) {
    input.classList.remove('is-invalid');
    input.classList.add('input');
  }

  function validation(input) {
    input.value = input.value.trim();
    if (input.value === '') {
      errorInput(input);
      return false;
    }
    deleteErrorInput(input);
    return true;
  }
  function createFullName() {
    let fullName = '';
    for (let i = 0; i < 3; ++i) {
      fullName = `${fullName} ${allInput[i].value}`;
    }
    return fullName;
  }

  function formaterNumber(value) {
    const year = value.substring(0, 4).padStart(2, '0');
    const month = value.substring(5, 7).padStart(2, '0');
    const day = value.substring(8, 10).padStart(2, '0');
    const years = `${year}.${month}.${day}`;
    return years;
  }
  function Age(dateValue) {
    const year = dateValue.substring(0, 4).padStart(2, '0');
    const month = dateValue.substring(5, 7).padStart(2, '0');
    const day = dateValue.substring(8, 10).padStart(2, '0');

    let years = yyyy - year;
    if (month > mm) {
      years--;
    }

    let count = years;
    let result = '';

    if (count >= 10 && count <= 20) {
      result = ' лет';
    } else {
      count = years % 10;
      if (count === 1) {
        result = ' год';
      } else if (count >= 2 && count <= 4) {
        result = ' года';
      } else {
        result = ' лет';
      }
    }
    yearsFormat = `${day}.${month}.${year}`;
    return `${yearsFormat} (${years}${result})`;
  }

  function yearOfStudy(dateVal) {
    const yearValue = Number(dateVal.substring(0, 4));
    const course = yyyy - yearValue;
    const receiptDate = formaterNumber(dateVal);

    string = '';
    if ((course >= 4) && (mm >= 6)) {
      string = `${receiptDate} (Закончил(а))`;
    } else if (course !== 0 && course <= 4) {
      string = `${receiptDate} курс)`;
    } else if (course === 0 && course <= 4) {
      string = `${receiptDate} (1 курс)`;
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
    const rowTable = document.createElement('tr');
    const thFullname = document.createElement('th');
    const thFaculty = document.createElement('th');
    const thBirthday = document.createElement('th');
    const thDateEducation = document.createElement('th');

    rowTable.classList.add('row-table');
    rowTable.id = `${obj.id}`;

    thFullname.classList.add('fullname');
    thFullname.textContent = `${obj.lastname} ${obj.name} ${obj.surname}`;

    thFaculty.classList.add('faculty');
    thFaculty.textContent = obj.faculty;

    thBirthday.classList.add('birthday');
    const copyValDateBirth = obj.dateBirth;
    thBirthday.textContent = Age(copyValDateBirth);

    thDateEducation.classList.add('date-education');
    thDateEducation.textContent = yearOfStudy(obj.dateEducation);

    tableWrap.append(rowTable);
    rowTable.append(thFullname);
    rowTable.append(thFaculty);
    rowTable.append(thBirthday);
    rowTable.append(thDateEducation);
  }

  function deleteStudents(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function sorting(obj, prop, fla) {
    const newArr = obj.slice().sort((a, b) => {
      if (a[`${prop}`] < b[`${prop}`]) return -1;
    });

    if (fla) {
      for (let i = 0; i < obj.length; i++) {
        createRowTable(newArr[i]);
      }
      fla = false;
    } else {
      for (let i = 0; i < obj.length; i++) {
        createRowTable(obj[i]);
      }
      fla = true;
    }
  }

  function interlinearFilter(objects, key, value) {
    const result = [];

    for (let i = 0; i < objects.length; i++) {
      if (objects[i][key].toLowerCase().search(value.toLowerCase()) !== -1) {
        result.push(objects[i]);
      }
    }

    return result;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.submitter === btnAdd) {
      deleteStudents(tableWrap);
      listArray.forEach((item) => createRowTable(item));
      flag = false;
      for (i = 0; i < allInput.length; ++i) {
        valid = validation(allInput[i]);
        if (valid === flag && flag === false) {
          alert('Заполните все поля!');
          flag = true;
        }
      }
      if (valid === true && flag === false) {
        const newItemArray = {
          id: getNewId(listArray),
          fio: createFullName(),
          lastname: lastNameInput.value,
          name: nameInput.value,
          surname: surnameInput.value,
          faculty: facultyInput.value,
          dateEducation: dateEducation.value,
          dateBirth: dateBirth.value,
        };

        listArray.push(newItemArray);
        createRowTable(newItemArray);
      }
    }

    if (event.submitter === searchBtn) {
      deleteStudents(tableWrap);
      let newArr = [];
      if (nameInput.value.trim() !== '') { newArr = interlinearFilter(listArray, 'name', nameInput.value); }
      if (lastNameInput.value.trim() !== '') { newArr = interlinearFilter(listArray, 'lastname', lastNameInput.value); }
      if (surnameInput.value.trim() !== '') { newArr = interlinearFilter(listArray, 'surname', surnameInput.value); }
      if (dateEducation.value.trim() !== '') { newArr = interlinearFilter(listArray, 'dateEducation', formaterNumber(dateEducation.value)); }
      if (dateBirth.value.trim() !== '') { newArr = interlinearFilter(listArray, 'dateBirth', formaterNumber(dateBirth.value)); }
      if (facultyInput.value.trim() !== '') { newArr = interlinearFilter(listArray, 'faculty', facultyInput.value); }

      for (let i = 0; i < newArr.length; i++) {
        createRowTable(newArr[i]);
      }
    }
  });
  tableHead.addEventListener('click', (ev) => {
    deleteStudents(tableWrap);
    console.log('click');
    let targetElem = '';
    if (ev.target === dateEducationFilter) {
      targetElem = 'dateEducation';
    }

    if (ev.target === dateFilter) {
      targetElem = 'dateBirth';
    }

    if (ev.target === facultyFilter) {
      targetElem = 'faculty';
    }
    if (ev.target === fullnameFilter) {
      targetElem = 'fio';
    }

    sorting(listArray, targetElem, flag);
    flag = !flag;
  });

  listArray.forEach((item) => createRowTable(item));
})();
