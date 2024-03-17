import { addBookToLibrary } from "./add_books.js";
import { Book } from "./book_class.js";
import { data } from "./data.js";

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const inputElements = favDialog.getElementsByClassName("input");
const confirmBtn = favDialog.querySelector("#confirmBtn");

const cancelBtn = document.getElementById("cancelBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

data.forEach((element) => {
  const book = new Book(element[0], element[1], element[2], element[3]);
  addBookToLibrary(book);
});

// "Cancel" button closes the dialog without submitting because of [form method="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  if (!(favDialog.returnValue == "cancel")) {
    let new_book_data = favDialog.returnValue
      .split(", ")
      .reduce((acc, currentValue) => {
        const [key, value] = currentValue.split(": ");
        acc[key.trim()] = isNaN(value) ? value : parseInt(value);
        return acc;
      }, {});

    let book = new Book(
      new_book_data.title,
      new_book_data.author,
      new_book_data.pages,
      new_book_data.status
    );
    addBookToLibrary(book);
  }
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
allInputsAreValid();
confirmBtn.addEventListener("click", (event) => {
  if (allInputsAreValid()) {
    event.preventDefault();
    let data = [];
    for (const element of inputElements) {
      data.push(`${element.name}: ${element.value}`);
    }

    favDialog.close(data.join(", "));
  }
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  favDialog.close("cancel");
});

function allInputsAreValid() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pageInput = document.getElementById("pages");

  titleInput.addEventListener("input", () => {
    if (titleInput.validity.valid) {
      titleInput.setCustomValidity("");
    } else {
      titleInput.setCustomValidity("What is the title of the book?");
    }
  });

  authorInput.addEventListener("input", () => {
    if (authorInput.validity.valid) {
      authorInput.setCustomValidity("");
    } else {
      authorInput.setCustomValidity("You forgot to tell the author's name");
    }
  });

  pageInput.addEventListener("input", () => {
    if (pageInput.validity.valid) {
      pageInput.setCustomValidity("");
    } else {
      pageInput.setCustomValidity("What is the page number of the book?");
    }
  });
  if (
    titleInput.validity.valid &&
    authorInput.validity.valid &&
    pageInput.validity.valid
  ) {
    return true;
  }
}
