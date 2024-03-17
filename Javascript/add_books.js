let library = [];

const tbody = document.getElementsByTagName("tbody")[0];
const myTable = document.getElementById("myTable");

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
    if (element.textContent.length == 5) {
      element.textContent = "Read";
    }
    element.addEventListener("click", (e) => {
      element.textContent == "Read"
        ? (element.status = element.textContent = "Not read")
        : (element.status = element.textContent = "Read");
    });
  });
}

export function addBookToLibrary(book) {
  library.push(book);
  book.index = library.indexOf(book);
  tbody.innerHTML += book.info();
  addClickEventOnRemoveButtons();
  addClickEventOnReadButtons();
}
