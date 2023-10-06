export async function getTodoList(owner) {
  // let listArray = [];
  let item = [];
  let localData = localStorage.getItem(owner);
  if (localData != null && localData !== '') {
   item.push(JSON.parse(localData));
  }
  return item[0];
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
export function saveList(todos, arr) {
  localStorage.setItem(todos, JSON.stringify(arr));
}
// for (const listItem of listArray) {
//   let todoItem = createTodoItem(listItem);
//   todoList.append(todoItem.item);
// }

export function onDoneClick(listArray, object) {
  for( const listItem of listArray) {
        if (listItem.id == object.id){
           listItem.done = !listItem.done;
        }
      }
      localStorage.setItem(listArray, JSON.stringify(listName));
}
let listArray = [];
// передаем это в onCreateFormSubmit:
export function createTodoItem({ owner, name }){
  // localStorage.setItem((owner), JSON.stringify(name));

  let newItemArray = {
    done: false,
    id: getNewId(listArray),
    name: name,
  };

  listArray.push(newItemArray);
  console.log(listArray);
  saveList(owner, listArray)
  return newItemArray;
}

export function switchTodoItemDone({todoItem}) {
  todoItem.done = !todoItem.done;
  saveList(todoItem.owner, listArray);
}

// doneButton.addEventListener('click', function() {
//   item.classList.toggle('list-group-item-success');
//   for( const listItem of listArray) {
//     if (listItem.id == object.id){
//        listItem.done = !listItem.done;
//     }
//   }
//   saveList(listArray, listName);
// });


// listName = owner;

    // let localData = localStorage.getItem(listName);
    // if (localData != null && localData !== '') {
    //   listArray = JSON.parse(localData);
    // }

    // for (const listItem of listArray) {
    //   let todoItem = createTodoItemElement(listItem);
    //   todoList.append(todoItem.item);
    // }


