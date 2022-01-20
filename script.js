const todoList = document.querySelector(".todo-items");

// create element en laat de lijstje zien. 

function renderItems(doc) {
  let todo-item = document.createElement("div");
  let todo-text = document.createElement('div');
  let checkMark = document.createElement('div')

  todoTextData.setAttribute('data-id', doc.id);
  todo - text.textContent = doc.data().text;
  checkMark.textContent = doc.data().status;

  todoTextData.appendChild(text);
  todoTextData.appendChild(statusCh);

  todoList.appendChild(".todo-item")
}


db.collection('todo-items').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderItems(doc)
  })
})




