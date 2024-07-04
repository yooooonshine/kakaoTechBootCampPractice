window.onload = function () {
    makeTodoListStorage();

    showTodoList();
};


// 항목을 저장하는 저장소 생성
function makeTodoListStorage() {
    let list = window.localStorage.getItem("list");

    // list가 없으면 항목을 저장하는 딕셔너리 및 인덱스 저장
    if (list == null) {

        let dict = {};
        saveTodoList(dict);
        window.localStorage.setItem("index", "0");
    }
}


//list에 항목을 직렬화하는 함수
function saveTodoList(list) {
    window.localStorage.setItem("list", JSON.stringify(list));
}


//list에서 항목을 역직렬화하여 가져오는 함수
function getTodoList() {
    let list = window.localStorage.getItem("list");

    return JSON.parse(list);
}

// 기존 toDoList 항목 띄위주는 함수
function showTodoList() {
    let list = JSON.parse(window.localStorage.getItem("list"));

    for (let key in list) {
        showItem(key, list[key]);
    }
}


// localStorage에 항목을 저장하고 인덱스를 리턴
function saveItem(text) {
    let index = parseInt(window.localStorage.getItem("index"));
    let list = getTodoList();

    list[index] = text;

    //저장
    saveTodoList(list);
    window.localStorage.setItem("index", String(index + 1));

    return index;
}


// 확인 버튼을 클릭했을 때 투두리스트에 toDoText를 넣어주는 함수
function clickSubmitButton() {
    const toDoText = document.getElementById("toDoText").value; //추가할 내용

    const index = saveItem(toDoText);

    showItem(index, toDoText);
}


let toDoLi = '<li><input type="checkbox"></li>';

// html에 항목을 넣어주는 함수
function showItem(index, text) {
    const todoList = document.getElementById("toDoList");// ul 태그

    let toDoLi = '<li id='
        + index
        + '><input type="checkbox" onclick="clickCheckBox(event)">'
        + text +
        '<button onclick="clickDeleteButton(event)" type="button" class="btn btn-danger"    >삭제</button></li>';

    todoList.innerHTML += toDoLi;
}


//checkBox를 클릭했을 때 on, off에 따라 밑줄을 그려주는 함수
function clickCheckBox(event) {
    let t = event.target;

    // 1. 체크되었을 때
    // 2. 체크 해제하였을 때
    if (t.checked) {
        t.parentNode.style.textDecorationLine = "line-through";
    } else {
        t.parentNode.style.textDecorationLine = "initial";
    }
}


//삭제 버튼을 눌렀을 때 항목 삭제하는 함수
function clickDeleteButton(event) {
    let t = event.target.parentNode;
    let id = parseInt(t.id);
    let todoList = getTodoList();

    //html에서 제거
    t.remove();

    console.log(todoList[id]);

    //localStorage에서 제거
    delete todoList[id];
    saveTodoList(todoList);
}

