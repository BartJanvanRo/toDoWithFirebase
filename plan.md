1. create the boxeswe need to create
2. the banner
3. header create.
4. inputfield
5. toDoItems
6. set up database
7. save data in database
8. grab the data from the database.
9. create func to update the data with the new status of completed or active.



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
                let countCompleted = 0;

            }
        }
    }) countCompleted++

}
let itemsLeft = document.createElement("div");
itemsLeft.classList.add("items-left");
itemsLeft.innerHTML = countCompleted