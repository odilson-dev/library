export class Book {
  constructor(title, author, number_of_pages, status) {
    this.title = title;
    this.author = author;
    this.number_of_pages = number_of_pages;
    this.status = status;
    this.index = null;
  }
  info = function () {
    return (
      `<tr> <td>${this.title}</td> <td>${this.author}</td> <td> ${this.number_of_pages}</td> <td><button class="is_read" >` +
      this.status +
      `</button</td> <td><button class="remove" index=${this.index}>Remove</button></td></tr>`
    );
  };
}
