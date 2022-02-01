

/* let wishContainer = document.createElement('div');
wishContainer.classList.add('wishContainer')

let switchLabel = document.createElement('label');
switchLabel.classList.add('switch')
wishContainer.appendChild(switchLabel);

let checkBox = document.createElement('input');
checkBox.type.add('checkBox')
switchLabel.appendChild(checkBox);

let sliderSpan = document.createElement('span');
sliderSpan.classList.add('slider round')
switchLabel.appendChild(sliderSpan);

let text = document.createElement('div');
text.classList.add('wishName')
wishContainer.appendChild(text);

let status = document.createElement('div');
status.classList.add('status')
wishContainer.appendChild(status);

div.setAttribute('data-id', dream.id);
status.textContent = dream.data().text
text.textContent = dream.data().status
cross.textContent = 'x';
 */


function addItem(event) {
    event.preventDefault();
    let text = document.getElementById("inputField");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active"
    });
    text.value = "";
    countAll();
}




function getItems() {
    db.collection("todo-items").onSnapshot(snapshot => {
        // console.log("snapshot" + JSON.stringify(snapshot));
        let items = [];
        snapshot.docs.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });
        // console.log("items" + JSON.stringify(items));
        generateItems(items);
    });
}
function countAll() {
    console.log("runningcountAll");
    db.collection("todo-items")
        .get()
        .then(snap => {
            size = snap.size;
            document.getElementById("counterId").innerHTML = size;
        });

}

function generateItems(items) {
    let itemsHTML = "";
    items.forEach(item => {
        // console.log(item);


        itemsHTML += `
        <div class="wishContainer">
        <label class="switch" onclick="markCompleted()>
            <input data-id  type="checkbox">
            <span class="slider round"></span>
        </label>
        <div class="wishName">
            <h2>${item.text}</h2>
        </div>
        <span class="status">
            <h3>${item.status}</h3>
        </span>
        </div>
   </div>`;
    });
    document.querySelector(".containerCenter").innerHTML = itemsHTML;
    createEventListeners();
}

let bin = document.querySelector(".switch");

function createEventListenersBins() {
    document.querySelector(".switch").forEach(bin => {
        bin.addEventListener("click", function () {
            deleteOne(bin.dataset.id);
        });
    });
}
function createEventListeners() {
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    let bins = document.querySelectorAll(".binmarkcont");
    console.log("todoCheckMarks" + JSON.stringify(todoCheckMarks) + todoCheckMarks.length
    );
    todoCheckMarks.forEach(checkMark => {
        checkMark.addEventListener("click", function () {
            markCompleted(checkMark.dataset.id);
        });
    });
    bins.forEach(bin => {
        bin.addEventListener("click", function () {
            deleteOne(bin.dataset.id);
        });
    });
}
function deleteOne(id) {
    let item = db.collection("todo-items").doc(id);
    item.delete();
    countAll();
}
function markCompleted(id) {
    let item = db.collection("todo-items").doc(id);
    alert(item + id);
    item.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().status == "active") {
                item.update({
                    status: "completed"
                });
            } else {
                item.update({
                    status: "active"
                });
            }
        }
    });
    console.log("itemMC" + JSON.stringify(item));
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