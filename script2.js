
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

function generateItems(items) {
    let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="assets/icon-check.svg">';
        checkMark.addEventListener("click", function () {
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;

        let cross = document.createElement('div');
        cross.classList.add("remove-symbol")

        cross.onclick = (e) => removeItem(e, item.id)



        //visualisatie aanvinken volledig.
        if (item.status == "completed") {
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
            cross.textContent = 'x';
            //hier ook de koppeling aantal notities en aangevinkt et

        }

        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem);
        todoItem.appendChild(cross);



        //        let removeAllSelector = document.querySelectorAll(".items-clear")

    })
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}



/* function delAll() {
    db.collection('todo-items')
} */

function countAll() {
    //    console.log("runningcountAll");
    db.collection("todo-items").where("status", "==", "active").get().then(snap => {
        size = snap.size;
        document.getElementById("counterId").innerHTML = size;
    });

}




function addItem(event) {
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}


//e event object. in event listener
function removeItem(e, id) {
    e.preventDefault();
    console.log(id)
    let item = db.collection("todo-items").doc(id);
    item.get().then(function (doc) {
        item.delete()

    })
}

/* const removeItems = (id) => {
    let item = db.collection("todo-items").doc(id);
    if (item.status === "completed") {
        item.markCompleted.push("")
    } else {
        break
    }
}

 */


//verwerkt de database
function markCompleted(id) {
    let item = db.collection("todo-items").doc(id);
    item.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().status == "active") {
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}




function compDeleter() {
    var item = db.collection("todo-items").where("status", "==", "completed");
    item.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
        countAll();
    });
}

getItems();
countAll();




/* <div class="items-clear">
          <span>Clear Completed</span>
        </div> */

/* remove the elements if/else statement  */

