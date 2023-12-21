// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCKPzZ9NF8SFg-mG9P5qgkEO0UEq0E9xYs",
  authDomain: "smit-batch10.firebaseapp.com",
  projectId: "smit-batch10",
  storageBucket: "smit-batch10.appspot.com",
  messagingSenderId: "103226662049",
  appId: "1:103226662049:web:22ba57624c384ad236a4e0",
};
firebase.initializeApp(firebaseConfig);

// Reference to Firestore
var db = firebase.firestore();

// Function to add a new ToDo
function addTodo() {
  var todoInput = document.getElementById("todoInput");
  var todoText = todoInput.value.trim();

  if (todoText !== "") {
    db.collection("todos")
      .add({
        text: todoText,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        todoInput.value = "";
        renderTodos();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}

// Function to render ToDo items
function renderTodos() {
  var todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  db.collection("todos")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var todoItem = document.createElement("li");
        todoItem.className = "list-group-item";
        todoItem.innerHTML = `
           <div class="w-100 d-flex align-items-center justify-content-between">
        <span>${doc.data().text}</span>
        <div class="d-flex align-items-center ">
        <span class="edit-btn mr-3" onclick="editTodo('${
          doc.id
        }')"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></span>
        <span class="delete-btn" onclick="deleteTodo('${
          doc.id
        }')"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></span>
        </div>
    </div>
             
           `;
        todoList.appendChild(todoItem);
      });
    });
}

// Function to edit a ToDo
function editTodo(todoId) {
  var newText = prompt("Edit ToDo:", "");

  if (newText !== null) {
    db.collection("todos")
      .doc(todoId)
      .update({
        text: newText,
      })
      .then(function () {
        console.log("Document successfully updated!");
        renderTodos();
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }
}

// Function to delete a ToDo
function deleteTodo(todoId) {
  db.collection("todos")
    .doc(todoId)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
      renderTodos();
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

// Render initial ToDo items
renderTodos();
