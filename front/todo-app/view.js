 async function local(title, owner) {
  let local = await import("./localStorage.js");
  const todoItemList = await local.getTodoList(owner);
  const createTodoItem = local.createTodoItem;
  const switchTodoItemDone = local.switchTodoItemDone;
  const deleteTodoItem = local.deleteTodoItem;
  createTodoApp(document.getElementById("todo-app"), {
    title,
    owner,
    todoItemList,
    onCreateFormSubmit: createTodoItem,
    onDoneClick: switchTodoItemDone,
    onDeleteClick: deleteTodoItem,
  });
}
async function api(title, owner) {
  let api = await import("./api.js");
  const todoItemList = await api.getTodoList(owner);
  const createTodoItem = api.createTodoItem;
  const switchTodoItemDone = api.switchTodoItemDone;
  const deleteTodoItem = api.deleteTodoItem;
  createTodoApp(document.getElementById("todo-app"), {
    title,
    owner,
    todoItemList,
    onCreateFormSubmit: createTodoItem,
    onDoneClick: switchTodoItemDone,
    onDeleteClick: deleteTodoItem,
  });
}
// let listArray = []
// let listName = '';
// созадаёт и возращает заголовок приложения
function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
};

// создаём и возвращаем форму для создания дела
function createTodoItemForm(){
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.disabled = true;
  button.textContent = 'Добавить дело';

  document.body.append(form);
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  input.addEventListener('input', function(){
  button.disabled = false;
  if(!input.value){
    button.disabled = true;
  }
});
  button.addEventListener('submit', function(){
    if (input.value !== ""){
    button.disabled = true;
    } else {
      button.disabled = false;
    }
  })


  return {
    form,
    input,
    button,
  };
}
// создаём и возвращаем список элементов
function createTodoList(){
let list = document.createElement('ul');
list.classList.add('list-group');
return list;
}

function createTodoItemElement(todoItem, {onDone, onDelete}) {
    // console.log(todoItem)
    const doneClass ='list-group-item-success';
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    console.log(todoItem.name)
    item.textContent = todoItem.name;


    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', function() {
      onDone({todoItem, element: item});
      item.classList.toggle(doneClass, todoItem.done);
      // for( const listItem of listArray) {
      //   if (listItem.id == object.id){
      //      listItem.done = !listItem.done;
      //   }
      // }
      // saveList(listArray, listName);
    });

    deleteButton.addEventListener('click', function() {
      onDelete({ todoItem, element: item});
    });


    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    if (todoItem.done) {
      item.classList.toggle(doneClass);
    }

    // окрашиваем в злёный выполненные дела

    return item;
}

function getNewId(arr){
  let max = 0;
  for(const item of arr) {
    if(item.id > max){
      max = item.id;
    }
  }
  return max + 1;
}

// function saveList(arr, keyName) {
//   localStorage.setItem(keyName, JSON.stringify(arr));
// }
let flag = false;
export function btnStorage(title, owner){
  const btnToggleStorage = document.querySelector(".btn-storage");
  local(title, owner);

  btnToggleStorage.addEventListener("click", () => {
    if (flag === true) {
      // локальное хранилище
      local(title, owner);
    } else {
      // серверное хранилище возвращает промис
      api(title, owner);
    }
    flag = !flag;
  });
}

async function createTodoApp(container, {title, owner, todoItemList, onCreateFormSubmit, onDoneClick, onDeleteClick}) {
  //  console.log(todoItemList)
    container.innerHTML = '';
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    const handlers = {onDone: onDoneClick, onDelete: onDeleteClick,}


    // container.append(buttonStorage);
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // buttonStorage.addEventListener('click', () => {
    //   console.log('gedf');
    // })


     // listName = owner;

    // let localData = localStorage.getItem(listName);
    // if (localData != null && localData !== '') {
    //   listArray = JSON.parse(localData);
    // }

    // for (const listItem of listArray) {
    //   let todoItem = createTodoItemElement(listItem);
    //   todoList.append(todoItem.item);
    // }

    todoItemList.forEach((todoItem) => {
        const todoItemElement = createTodoItemElement(todoItem, handlers);
        todoList.append(todoItemElement);
    })


    todoItemForm.form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }
      todoItemForm.button.disabled = true;

      //создание дела
      const todoItem = await onCreateFormSubmit({owner, name: todoItemForm.input.value.trim(),});
      console.log(todoItemForm.input.value);

     // создание элемента и вывод на страницу
      let todoItemElement = createTodoItemElement(todoItem, handlers);



      // добавляем на страницу дело с названием из поля
      todoList.append(todoItemElement);
      todoItemForm.input.value = '';
    });
}


export {createTodoApp};
