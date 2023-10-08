export async function getTodoList(owner) {
  let item = [];
  let localData = localStorage.getItem(owner);
  if (localData != null && localData !== '') {
   item.push(JSON.parse(localData));
  }
  return item[0];
}
function getNewId(arr){
  let max = 0;
  if(arr){
    for(const item of arr) {
      if(item.id > max){
        max = item.id;
      }
    }
    return max + 1;
  }

}
export function saveList(todos, arr) {
  localStorage.setItem(todos, JSON.stringify(arr));
}

// передаем это в onCreateFormSubmit:
export function createTodoItem({ owner, name }, arr){
  let newItemArray = {
    done: false,
    id: getNewId(arr),
    name: name,
  };
  return newItemArray;
}

export function switchTodoItemDone({todoItem}) {
  todoItem.done = !todoItem.done;
}

export function deleteTodoItem(todoItem, elem, arr, owner) {
const result = confirm('Вы уверены, что хотите удалить дело?');
let i = 0;

arr.forEach((item) => {
  if(item.id === todoItem.id && result === true){
    arr.splice(i, 1);
  }
  i++;
  saveList(owner, arr);
  elem.remove();
})
}
