const library = [];

// let title_input = prompt("Enter your book's title:");
// let author_input = prompt("Enter the author name:");
// let pages_input = prompt("Enter the pages number:");

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
let new_book = new Book(title_input, author_input, pages_input);

let book1 = new Book("Le Gouverneur de la rosee", "Jacques Roumain", "234");
let book2 = new Book("Paris, la ville de l'amour", "Thom Cruz", "637");

function addBookToLibrary(book) {
  library.push(book);
}

addBookToLibrary(new_book);
addBookToLibrary(book1);
addBookToLibrary(book2);

let tbody = document.getElementsByTagName("tbody")[0];

library.forEach((book) => {
  tbody.innerHTML += book.info();
});
