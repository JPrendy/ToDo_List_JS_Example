//this is the array we will use to keep track of our items
var item = [];
//this is an array to see if out todo items have been clicked as finished
var checkUnderline = [];
console.log(item[0]);

//Notes in regard to localStorage and arrays
// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
// https://stackoverflow.com/questions/30481516/iframe-in-chrome-error-failted-to-read-localstorage-from-window-access-den


// A note in regard to content Editable
// https://stackoverflow.com/questions/6831482/contenteditable-single-line-input

//if there is nothing stored in the arrays we will call setItems, however if we have anything saved from using the
//application before it will go and get the arrays items.
item = JSON.parse(localStorage.getItem("item"));
checkUnderline = JSON.parse(localStorage.getItem("checkUnderline"));

if (checkUnderline[0] == undefined) {
  localStorage.setItem("item", JSON.stringify(item));
  localStorage.setItem("checkUnderline", JSON.stringify(checkUnderline));
}

console.log("This is a test for localStorage " + item);

//this is a function that looks for the keypress of enter
function handle(e) {
  if (e.keyCode === 13) {
    e.preventDefault(); // Ensure it is only this code that rusn
    addToList();
  }
}

function addToList() {
  var SearchTerm = document.getElementById("searchinput").value;
  item.unshift(SearchTerm);
  checkUnderline.unshift(0);
  console.log(item);
  console.log(checkUnderline);
  document.getElementById("searchinput").value = "";
  displayList();
}

function displayList() {
  localStorage.setItem("item", JSON.stringify(item));
  localStorage.setItem("checkUnderline", JSON.stringify(checkUnderline));
  let output = '<div">';
  //The first forEach goes arround the first array that contains our todo list items
  item.forEach((value, index) => {
    //The second forEach array goes arround to check if the items have been clicked
    checkUnderline.forEach((value2, index2) => {
      //This checks thats the index number matches each other, to output the html
      if (index === index2) {
        //This if condition will display each item either as an item underlined or not underlined
        //check the h3 tag
        if (value2 == 0) {
          output += `
    <div class="container">
    <h3 class="size"  onclick="underline(${index}, ${value2} )" id="${index}">${value}</h3>
    <span id="edit${index}">
    <button onclick="editText(${index})" class="btn btn-primary">Edit</button>
    </span>
    <span >
    <button onclick="removeItem(${index})" class="btn btn-danger">Remove Item </button>
    </span>
  </div><hr>`;
        } else {
          output += `
                <div class="container">
                <h3 class="size underline"  onclick="underline(${index}, ${value2} )" id="${index}">${value}</h3>
                <span id="edit${index}">
                <button onclick="editText(${index})" class="btn btn-primary">Edit</button>
                </span>
                <span >
                <button onclick="removeItem(${index})" class="btn btn-danger">Remove Item </button>
                </span>
              </div><hr>`;
        }
      }
    });
  });
  output += "</div>";
  document.getElementById("results").innerHTML = output;
}

function underline(index, underline) {
  let edit = document.getElementById(index);
  //this checks if the css mystyle is applied, this was needed as the h3 onClick and contentEditable were
  //contradict each other, making it impossible to edit the items content, unless it was rewritten.
  if (edit.classList.contains("mystyle")) {
  } else {
    if (underline == 0) {
      edit.classList.add("underline");
      checkUnderline[index] = 1;
    } else {
      edit.classList.remove("underline");
      checkUnderline[index] = 0;
    }
    localStorage.setItem("checkUnderline", JSON.stringify(checkUnderline));
    displayList();
  }
}

function editText(test) {
  document.getElementById(test).contentEditable = true;
  let edit = document.getElementById(test);
  edit.classList.add("mystyle");
  let output2 = `
    <button  onclick="saveText(${test})" class="btn btn-success">Submit</button>
    `;
  document.getElementById("edit" + test).innerHTML = output2;
}

function saveText(test2) {
  document.getElementById(test2).contentEditable = false;
  let x = document.getElementById(test2).innerHTML;
  let removeClass = document.getElementById(test2);
  removeClass.classList.remove("mystyle");
  item[test2] = x;
  localStorage.setItem("item", JSON.stringify(item));
  let output2 = `
    <button  onclick="editText(${test2})" class="btn btn-primary">Edit</button>
    `;
  document.getElementById("edit" + test2).innerHTML = output2;
}

function removeItem(index2) {
  item.splice(index2, 1);
  checkUnderline.splice(index2, 1);
  console.log("remove");
  displayList();
}
