let form=document.querySelector("#book-form")
let tableList= document.querySelector('#book-list')

window.addEventListener("DOMContentLoaded",(e)=>{
    let books= JSON.parse(localStorage.getItem("books"))
    books.forEach(book => {
    createRow(book.title, book.author, book.isbn)
    });
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let title=document.querySelector("#title").value
    let author=document.querySelector("#author").value
    let isbn=document.querySelector("#isbn").value
    checkIfNull() 
    let book={title:title, author:author, isbn:isbn}
    clearAllFields()
    createRow(title, author, isbn)
    addRow(book)
})   

//To delete the contents
tableList.addEventListener("click",(e)=>{
    removeRow(e);
    deleteRow(e); 
})

function checkIfNull(){
    if(title===''){
        document.querySelector('#title').focus()
        alert("Enter Title of the Book")
        return
    }
    if(author===''){
        document.querySelector('#author').focus()
        alert("Enter Author of the book")
        return
    } 
    if(isbn===''){
        document.querySelector("#isbn").focus()
        alert('Enter ISBN of the book')
        return
    } 
}

function clearAllFields(){
    document.querySelector("#title").value=''
    document.querySelector("#author").value=''
    document.querySelector("#isbn").value=''
}

//function to CREATE a row in front page
function createRow(title, author, isbn){
    // tableList.innerHTML=`<tr>
    //     <td>${title}</td>
    //     <td>${author}</td>
    //     <td>${isbn}</td>
    //     <td><a href="#" class="btn btn-danger float-right delete">X</td>        
    // </tr>`

    const tr= document.createElement("tr") //<tr></tr>
    tr.innerHTML=`<td>${title}</td>
    <td>${author}</td>
    <td>${isbn}</td>
    <td><a href="#" class="btn btn-danger float-right delete">X</td>`
    tableList.appendChild(tr)
}

//function to CREATE a row in LocalStorage
function addRow(book){
    let newbook;
    if(localStorage.getItem("books")==null){
        newbook=[]
    }
    else{
        newbook= JSON.parse(localStorage.getItem("books"))
    }
    newbook.push(book)
    localStorage.setItem("books", JSON.stringify(newbook))
    console.log("done")
}

//function to DELETE a row in front page
function removeRow(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure you want to DELETE it?")){
            tableList.removeChild(e.target.parentElement.parentElement)
        } 
    }
}

//function to DELETE a row in LocalStorage
function deleteRow(e){
    let books=JSON.parse(localStorage.getItem("books"))
    const tempIsbn=e.target.parentElement.previousElementSibling.textContent
    const newbooks=books.filter(book => book.isbn !== tempIsbn)
    localStorage.setItem("books", JSON.stringify(newbooks))
}

