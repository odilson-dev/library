const library = [];

function Book(title, author, number_of_pages) {
  this.title = title;
  this.author = author;
  this.number_of_pages = number_of_pages;
  this.read = false;

  this.info = function () {
    return `<tr> <td>${this.title}</td> <td>${this.author}</td> <td> ${
      this.number_of_pages
    }</td> <td> ${this.read ? "already read" : "Not read yet"}</td> </tr>`;
  };
}

function addBookToLibrary(book) {
  library.push(book);
}

let tbody = document.getElementsByTagName("tbody")[0];

library.forEach((book) => {
  tbody.innerHTML += book.info();
});

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const inputElements = favDialog.getElementsByTagName("input");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [form method="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form

  let radioValue;
  // Iterate through radio buttons to find the checked one
  for (const element of inputElements) {
    if (element.type === "radio" && element.checked) {
      radioValue = element.value;
      break;
    }
  }

  let data = [];
  // Include radio button value in the data array
  data.push(`read: ${radioValue ? radioValue : "N/A"}`);
  // Include other input values in the data array
  for (const element of inputElements) {
    if (element.type !== "radio") {
      data.push(`${element.name}: ${element.value}`);
    }
  }

  favDialog.close(data.join(", "));
});
