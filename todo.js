var array = ["First Item"];

//Notes in regard to localStorage and arrays
// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
// https://stackoverflow.com/questions/30481516/iframe-in-chrome-error-failted-to-read-localstorage-from-window-access-den
array = JSON.parse(localStorage.getItem("array"));
console.log("This is a test for localStorage" + array);

function addToList() {
  var SearchTerm = document.getElementById("searchinput").value;
  array.unshift(SearchTerm);
  console.log(array);

  display();


}

function display(){
    localStorage.setItem("array", JSON.stringify(array));
    let output = '<div">';
array.forEach((value, index)=>{
    output += `
    <div class="container">
    <h3 class="size" id="${index}">${value}</h3>
    <span id="edit${index}">
    <button onclick="myFunction(${index})" class="btn btn-primary">Edit</button>
    </span>
    <span >
    <button onclick="remove(${index})" class="btn btn-danger">Remove Item </button>
    </span>
  </div><hr>`;
  
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
}


function myFunction(test) {
    document.getElementById(test).contentEditable = true;
    let edit= document.getElementById(test);
    edit.classList.add("mystyle");
    let output2 = `
 
    <button  onclick="myFunction2(${test})" class="btn btn-success">Submit</button>

    `;

  
    document.getElementById("edit" + test).innerHTML = output2;

}

function myFunction2(test2) {
    document.getElementById(test2).contentEditable = false;
    let x = document.getElementById(test2).innerHTML;
    let removeClass = document.getElementById(test2);
    removeClass.classList.remove("mystyle");

    array[test2] = x;
    localStorage.setItem("array", JSON.stringify(array));
    let output2 = `
 
    <button  onclick="myFunction(${test2})" class="btn btn-primary">Edit</button>


    `;
  
    document.getElementById("edit" + test2).innerHTML = output2;


}



function remove(index2){
    array.splice(index2, 1);
    console.log("remove");
    display();
}