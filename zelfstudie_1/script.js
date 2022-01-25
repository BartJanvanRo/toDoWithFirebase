const wishList = document.querySelector('#wishList');
const form = document.querySelector('#add-wish-form')

//element creeren en laten weergeven.
function renderWish(doc) {
  let li = document.createElement('li');
  let text = document.createElement('span');
  let status = document.createElement('span');
  let cross = document.createElement('div');
  let toggle = document.createElement('span');

  //id oproepen
  li.setAttribute('data-id', doc.id);
  status.textContent = doc.data().text
  text.textContent = doc.data().status
  cross.textContent = 'x';

  //li element creeren
  li.appendChild(status);
  li.appendChild(text);
  li.appendChild(cross);
  status.appendChild(checkMark);

  wishList.appendChild(li);

  //1 x data verwijderen
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log("test werking")
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('todo-items').doc(id).delete()
  })
}



//data oproepen.
/* db.collection("todo-items").orderBy('text').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data())
    renderWish(doc)
  });
}) */



//data opslaan.
form.addEventListener('submit', (e) => {
  //stopt het automatisch laden pagina
  e.preventDefault();
  db.collection("todo-items").add({
    text: form.text.value,
    status: form.status.value
  });
  // maakt het leeg:
  form.text.value = ''
})

//data oproepen en direct aanpassing in scherm
db.collection("todo-items").orderBy('text').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    console.log(change.doc.data())
    if (change.type == 'added') {
      renderWish(change.doc);
    } else if (change.type == 'removed') {
      let li = wishList.querySelector('[data-id=' + change.doc.id + ']')
      wishList.removeChild(li);
    }

  });
})

//toggle button
let toggle = document.querySelector(".toggle");

function animateToggle() {
  toggle.classList.toggle("active");

}