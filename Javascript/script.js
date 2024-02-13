const library = [];
const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const inputElements = favDialog.getElementsByTagName("input");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const tbody = document.getElementsByTagName("tbody")[0];
const myTable = document.getElementById("myTable");

function Book(title, author, number_of_pages, read) {
  this.title = title;
  this.author = author;
  this.number_of_pages = number_of_pages;
  this.read = read === "yes" ? true : false;
  this.index = null;

  this.info = function () {
    return `<tr> <td>${this.title}</td> <td>${this.author}</td> <td> ${
      this.number_of_pages
    }</td> <td><button class="is_read" >${
      this.read ? "Already read" : "Read"
    }</button</td> <td><button class="remove" index=${
      this.index
    } ">Remove</button></td></tr>`;
  };
}
function addClickEventOnRemoveButtons() {
  const removeButtons = document.querySelectorAll(".remove");

  removeButtons.forEach((element) => {
    element.addEventListener("click", (e) => {
      myTable.deleteRow(element.parentElement.parentElement.rowIndex);
      library.splice(element.getAttribute("index"), 1);
    });
  });
}

function addClickEventOnReadButtons() {
  const isReadButtons = document.querySelectorAll(".is_read");
  isReadButtons.forEach((element) => {
    element.addEventListener("click", (e) => {
      element.read
        ? ((element.read = false), (element.textContent = "Read"))
        : ((element.read = true), (element.textContent = "Already read"));
    });
  });
}

function addBookToLibrary(book) {
  library.push(book);
  book.index = library.indexOf(book);
  tbody.innerHTML += book.info();
  addClickEventOnRemoveButtons();
  addClickEventOnReadButtons();
}

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [form method="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
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
    new_book_data.read
  );
  addBookToLibrary(book);
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
