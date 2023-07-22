var bookName = document.getElementById("bookName");
var bookUrl = document.getElementById("bookUrl");
var bookArr = [];

if(localStorage.getItem("books") != null){
    bookArr = JSON.parse(localStorage.getItem("books"));
    dispalyBooks();
}
var sumbitBtn = document.getElementById("sumbitBtn");
var updateBtn = document.getElementById("updateBtn");
var indexUpdate = 0 ;

var tableData = document.getElementById("tableData");

var nameRules = /^[A-Za-z]{1,}$/;
function isNameOk(){
    if(nameRules.test(bookName.value)){
        return true ;
    }else{
        return false ;
    }
}

var urlRules = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/;
function isUrlOK(){
    if(urlRules.test(bookUrl.value)){
        return true ;
    }else{
        return false ;
    }
}


bookName.onkeyup= function(){
    if(isNameOk() == false){
        swal("Error ", "your name is not matching with rules , only you can write alphabet");
    }
}

bookUrl.onkeyup= function(){
    if(isUrlOK() == false){
        swal("Error ", "your name is not matching with rules  you can write https or www.,");
    }
}


function addBook(){
    var bookObject = {
        name : bookName.value,
        url : bookUrl.value ,
    };


    if(bookName.value=="" || bookUrl.value==""){
       swal("fill all date")
       return 0 ;
    }

    for (var i=0 ; i<bookArr.length ; i++){
        if(bookArr[i].name==bookName.value){
            swal("Error ", ".you have already book with this name");
            return  ;
        }
    }
    swal("Added", "the product added to our strore !", "success");
    bookArr.push(bookObject);
localStorage.setItem("books",JSON.stringify(bookArr));
clearInputs();
dispalyBooks();
}

function dispalyBooks(){
    var cartona = "";
    for (var i=0 ; i<bookArr.length ; i++){
        cartona+= `
        
        <tr>
    <td>${i+1}</td>

    <td>${bookArr[i].name}</td>

    <td>
    <a href="${bookArr[i].url}"  target="_blank">
        <Button class="btn btn-light">visit</Button>
    </a>
    </td>

<td><button class="btn btn-danger"  onclick="deleteItem(${i})" >delete</button></td>
<td><button class="btn btn-warning"  onclick="setData(${i})">Update</button></td>

</tr>
    `
    }
    document.getElementById("tableData").innerHTML = cartona ;
}

function clearInputs(){
     bookName.value ="";
     bookUrl.value ="";
}


function deleteItem(index){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
               bookArr.splice(index,1);
     localStorage.setItem("books",JSON.stringify(bookArr));
     dispalyBooks();

        } else {
          swal("Your imaginary file is safe!");
        }
      });

}

function setData(index){
    var currentIndex = bookArr[index];
    indexUpdate = index ;
    bookName.value    = currentIndex.name ;
    bookUrl.value  =  currentIndex.url; 
    sumbitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

function UpdateBook(){
    var bookObject = {
        name : bookName.value,
        url : bookUrl.value ,
    };
    swal("updated", "the product updated done !", "success");
    bookArr.splice(indexUpdate,1,bookObject);
localStorage.setItem("books",JSON.stringify(bookArr));
dispalyBooks();
clearInputs();
sumbitBtn.classList.remove("d-none");
updateBtn.classList.add("d-none");
}

function search(search){
    var cartona = "";
    for (var i=0 ; i<bookArr.length ;i++){
        if(bookArr[i].name.toLowerCase().includes(search.toLowerCase())){
        cartona += `
        
        <tr>
        <td>${i+1}</td>
        <td>${bookArr[i].name.replace(search, '<span>'+search+'</span>')}</td>

        <td>
        <a href="${bookArr[i].url}"   target="_blank" >
            <Button class="btn btn-light">visit</Button>
        </a>
        </td>

        <td><button class="btn btn-warning"  onclick="setData(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteOneRow(${i})">Delete</button></td>
       
    </tr>
        `
    }
}
    document.getElementById("tableData").innerHTML = cartona ;
}

