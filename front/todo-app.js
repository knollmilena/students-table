    let listArray = []
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

    async function createTodoApp(container, {title, owner, todoItemList, onCreateFormSubmit, onDoneClick, onDeleteClick,}) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        const handlers = { onDone: onDoneClick, onDelete: onDeleteClick,
        //   onDone({todoItem}) {
        //     todoItem.done = !todoItem.done;
        //     fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        //       method: 'PATCH',
        //       body: JSON.stringify({ done: todoItem.done}),
        //       headers: {
        //         'Content-Type': 'application/json',
        //       }
        //     })
        //   },
        // onDelete({todoItem, element}){
        //     if(!confirm('Вы уверены?')) {
        //       return;
        //     }
        //     element.remove();
        //     fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        //       method: 'DELETE',
        //     })
        // },
      }

        // listName = owner;

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        // let localData = localStorage.getItem(listName);
        // if (localData != null && localData !== '') {
        //   listArray = JSON.parse(localData);
        // }

        // const responce = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
        // const todoItemList = await responce.json();

        todoItemList.forEach((todoItem) => {
          const todoItemElement = createTodoItemElement(todoItem, handlers);
          todoList.append(todoItemElement);
        })

        // for (const listItem of listArray) {
        //   let todoItem = createTodoItemElement(listItem);
        //   todoList.append(todoItem.item);
        // }


        todoItemForm.form.addEventListener('submit', async function (e) {
          e.preventDefault();
          if (!todoItemForm.input.value) {
            return;
          }
          todoItemForm.button.disabled = true;

          // const response = await fetch('http://localhost:3000/api/todos', {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     name: todoItemForm.input.value.trim(),
          //     owner,
          //   }),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   }
          // });
          // const todoItem = await response.json();
          const todoItem = await onCreateFormSubmit({owner, name: todoItemForm.input.value.trim(),});

          let newItemArray = {
            id: getNewId(listArray),
            name: todoItemForm.input.value,
            done: false,
          };

          let todoItemElement = createTodoItemElement(todoItem, handlers);

          listArray.push(newItemArray);

          // добавляем на страницу дело с названием из поля
          todoList.append(todoItemElement);
          todoItemForm.input.value = '';
        });
    }

    window.createTodoApp = createTodoApp;

  export {createTodoApp};
