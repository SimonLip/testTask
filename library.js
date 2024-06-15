// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    borrowBook() {
        if (this.isAvailable) {
            this.isAvailable = false;
            return `You have borrowed "${this.title}" by ${this.author}`;
        } else {
            return `Sorry, "${this.title}" is currently unavailable.`;
        }
    }

    returnBook() {
        this.isAvailable = true;
        return `You have returned "${this.title}".`;
    }
}

// Member class
class Member {
    constructor(name, memberId) {
        this.name = name;
        this.memberId = memberId;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.isAvailable) {
            book.borrowBook();
            this.borrowedBooks.push(book);
            return `Member ${this.name} borrowed "${book.title}".`;
        } else {
            return `Sorry, "${book.title}" is currently unavailable.`;
        }
    }

    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.returnBook();
            this.borrowedBooks.splice(index, 1);
            return `Member ${this.name} returned "${book.title}".`;
        } else {
            return `Member ${this.name} does not have "${book.title}".`;
        }
    }

    listBorrowedBooks() {
        if (this.borrowedBooks.length === 0) {
            return `Member ${this.name} has not borrowed any books.`;
        } else {
            return `Books borrowed by ${this.name}: ` + this.borrowedBooks.map(book => `"${book.title}"`).join(", ");
        }
    }
}

// Library class
class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }

    addBook(title, author, isbn) {
        const book = new Book(title, author, isbn);
        this.books.push(book);
        return `Book "${title}" added to the library.`;
    }

    addMember(name, memberId) {
        const member = new Member(name, memberId);
        this.members.push(member);
        return `Member "${name}" added to the library.`;
    }

    findBook(isbn) {
        return this.books.find(book => book.isbn === isbn);
    }

    findMember(memberId) {
        return this.members.find(member => member.memberId === memberId);
    }

    borrowBook(memberId, isbn) {
        const member = this.findMember(memberId);
        const book = this.findBook(isbn);
        if (member && book) {
            return member.borrowBook(book);
        } else if (!member) {
            return `Member with ID ${memberId} not found.`;
        } else {
            return `Book with ISBN ${isbn} not found.`;
        }
    }

    returnBook(memberId, isbn) {
        const member = this.findMember(memberId);
        const book = this.findBook(isbn);
        if (member && book) {
            return member.returnBook(book);
        } else if (!member) {
            return `Member with ID ${memberId} not found.`;
        } else {
            return `Book with ISBN ${isbn} not found.`;
        }
    }

    listAvailableBooks() {
        const availableBooks = this.books.filter(book => book.isAvailable);
        if (availableBooks.length === 0) {
            return "No books available in the library.";
        } else {
            return "Available books: " + availableBooks.map(book => `"${book.title}" by ${book.author}`).join(", ");
        }
    }

    listMembers() {
        if (this.members.length === 0) {
            return "No members in the library.";
        } else {
            return "Library members: " + this.members.map(member => `${member.name} (ID: ${member.memberId})`).join(", ");
        }
    }
}

// Sample usage
const myLibrary = new Library();
console.log(myLibrary.addBook("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565"));
console.log(myLibrary.addBook("1984", "George Orwell", "9780451524935"));
console.log(myLibrary.addMember("Alice Johnson", "M001"));
console.log(myLibrary.addMember("Bob Smith", "M002"));

console.log(myLibrary.borrowBook("M001", "9780743273565"));
console.log(myLibrary.borrowBook("M002", "9780451524935"));
console.log(myLibrary.borrowBook("M001", "9780451524935"));

console.log(myLibrary.listAvailableBooks());
console.log(myLibrary.listMembers());

console.log(myLibrary.returnBook("M001", "9780743273565"));
console.log(myLibrary.listAvailableBooks());

console.log(myLibrary.listMembers());
