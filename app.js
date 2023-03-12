class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}
class Store{
    static getbooks(){
        let books;
        if (localStorage.getItem('books')===null){
            books=[];}
        else{
        books=JSON.parse(localStorage.getItem('books'));
    }
    return books;
    }

    static setbook(book){
        const books=Store.getbooks()
        books.push(book)
        const jsonData=JSON.stringify(books);
        localStorage.setItem('books',jsonData);

    }
    static removebook(isbn){


    }
}

class UI {
    static displaybooks() {
        const storedbooks = [
            { title: "this is my book", author: 'shafquet', isbn: '1245433633' },
            { title: "this is my new book", author: 'Naghmi', isbn: '12433633' }
        ];
        //const books = storedbooks;
        const books=Store.getbooks()
        books.forEach((book) => UI.addBookToList(book));
    }
    
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        const newTableRow = document.createElement('tr');
        newTableRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(newTableRow);
    }
    static clearFields(){
        document.getElementById('title').value=''
        document.getElementById('author').value=''
        document.getElementById('isbn').value=''
    }
    static deletebooks(targeted_name){
        if (targeted_name.classList.contains('delete')){
           const cls=document.querySelector('.delete')
           cls.parentElement.parentElement.remove()
        }
        
    }
    static ShowAlert(message){
        const div=document.createElement('div')
        div.className='alert';
        div.innerHTML=message
        const form=document.getElementById('book-form')
        document.body.insertBefore(div,form)
        //remove it after 3  seconds
        setTimeout(() =>document.querySelector('.alert').remove(),3000);
    }
}
document.addEventListener('DOMContentLoaded', UI.displaybooks);
document.querySelector('#book-form').addEventListener('submit',(e) =>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value ;
    if (title==='' || author==='' || isbn===''){
   UI.ShowAlert("Please enter valid value")
    }
    else{
        const book =new Book(title,author,isbn)
        
        UI.addBookToList(book)
        Store.setbook(book)
    }

    //const book =new Book(title,author,isbn)
    //console.log(book)
    //UI.addBookToList(book)
    UI.clearFields()
})

document.getElementById('book-list').addEventListener('click',(e) =>{
    console.log(e.target)
    UI.deletebooks(e.target)
});



