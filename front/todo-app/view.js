import { saveList } from "./localStorage.js";

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

function createTodoItemElement(todoItem, {onDone, onDelete}, owner, todoItemList, local) {

    const doneClass ='list-group-item-success';
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
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
      if(local){
        saveList(owner, todoItemList);
      }

    });

    deleteButton.addEventListener('click',  function() {
      onDelete( todoItem, item, todoItemList, owner);
      if(local){

      }

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

async function createTodoApp(container, {title, owner, todoItemList, onCreateFormSubmit, onDoneClick, onDeleteClick, local}) {

    container.innerHTML = '';
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    const handlers = {onDone: onDoneClick, onDelete: onDeleteClick,}

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if(todoItemList){
      todoItemList.forEach((todoItem) => {
        const todoItemElement = createTodoItemElement(todoItem, handlers, owner, todoItemList, local);
        todoList.append(todoItemElement);
    })
    }



    todoItemForm.form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }
      todoItemForm.button.disabled = true;
      //создание дела
      const todoItem = await onCreateFormSubmit({owner, name: todoItemForm.input.value.trim(),}, todoItemList);
  if (local && todoItemList){
    todoItemList.push(todoItem);
    saveList(owner, todoItemList);
  }

     // создание элемента и вывод на страницу
      let todoItemElement = createTodoItemElement(todoItem, handlers, owner, todoItemList, local);

      // добавляем на страницу дело с названием из поля
      todoList.append(todoItemElement);
      todoItemForm.input.value = '';
    });
}


export {createTodoApp};
