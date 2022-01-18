

function getItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      })
    })
    generateItems(items);
  })
}

/* hiermee wordt de textbalk leeggemaakt.  */


/* db = database */

//items ophalen. navragen wat onSnap en doc.id enzo bedoelen. 




function generateItems(items) {
  let itemsHTML = ""
  items.forEach((item) => {
    /* console.log(item)  lijn 37 ? is een if/else statement kort geschreven*/
    itemsHTML += `
    <div class="todo-item">
              <div class="check">                                             
              <div data-id="${item.id} class="check-mark" ${item.status} == "completed" && "checked" ? "checked": ""  >
      <img src="assets/icon-check.svg">
      </div>
              </div >
      <div class="todo-text ${item.status} == "completed" && "checked" ? "checked": "">
        ${item.text}
      </div>
            </div >


      `
  })
  document.querySelector(".todo-items").innerHTML = itemsHTML

}


//vervangt de todo-items met info vanuit database

function createEventListeners() {
  let todoCheck = document.querySelectorAll(".todo-item .check-mark");
  todoCheck.forEach((checkMark) => {
    checkMark.addEventListener("click", function () {
      markCompleted(checkMark.dataset.id)
    })
  })
}


function markCompleted(id) {
  //vanuit de database
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if (status == "active") {
        item.update({
          status: "completed"
        })
      } else if (status == "completed") {
        item.update({
          status: "active"
        })
      }
    }
  })
}

getItems();


