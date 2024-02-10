const library = [];

let title_input = prompt("Enter your book's title:");
let author_input = prompt("Enter the author name:");
let pages_input = prompt("Enter the pages number:");

function Book(title, author, number_of_pages) {
  this.title = title;
  this.author = author;
  this.number_of_pages = number_of_pages;
  this.read = false;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.number_of_pages}, ${
      this.read ? "already read" : "Not read yet"
    }`;
  };
}
