const txt = document.querySelector(".txt");
const save = document.querySelector(".save");
const list = document.querySelector(".list");
const whole = document.querySelector(".whole");
const todo = document.querySelector(".todo");
const done = document.querySelector(".done");
const doneCount = document.querySelector(".doneCount");
const doneClear = document.querySelector(".doneClear");
let btnStatus = 0;


let data = [];

//資料渲染
function renderData() {
    let str = "";
    data.forEach(function (item, index) {
        if (item.done == false) {
            str += `<li><input type="checkbox" name="" id="${index}"  class="check">${item.content} <a><img
        src="https://hexschool.github.io/js-todo/assets/cancel.jpg" data-num="${index}"
        class="delete"></a></li>`
        } else {
            str += `<li><input type="checkbox" name="" id="${index}"  class="check" checked>${item.content} <a><img
        src="https://hexschool.github.io/js-todo/assets/cancel.jpg" data-num="${index}"
        class="delete"></a></li>`
        }
    })
    list.innerHTML = str;
}

//抓已完成
function doneData() {
    let str = "";
    data.forEach(function (item, index) {
        if (item.done == true) {
            str += `<li><input type="checkbox" name="" id="${index}"  class="check" checked>${item.content} <a><img
        src="https://hexschool.github.io/js-todo/assets/cancel.jpg" data-num="${index}"
        class="delete"></a></li>`
        }
    })
    list.innerHTML = str;
    console.log(data);
}

//抓代辦
function todoData() {
    let str = "";
    data.forEach(function (item, index) {
        if (item.done == false) {
            str += `<li><input type="checkbox" name="" id="${index}"  class="check">${item.content} <a><img
        src="https://hexschool.github.io/js-todo/assets/cancel.jpg" data-num="${index}"
        class="delete"></a></li>`
        }
    })
    list.innerHTML = str;
    console.log(data);
}

//頁面判斷
function chooseData() {
    if (btnStatus == 0) {
        renderData();
    } else if (btnStatus == 1) {
        todoData();
    } else if (btnStatus == 2) {
        doneData();
    }
}
//計待完成數目
function Counter() {
    let count = 0;
    data.forEach(function (item, index) {
        if (item.done == false) {
            count += 1;
        }
    })
    str = `<h3>${count}個待完成項目</h3>`;
    doneCount.innerHTML = str;
}

//新增
save.addEventListener("click", function (e) {
    if (txt.value == "") {
        alert("請輸入內容");
        return;
    }
    obj = {};
    obj.content = txt.value;
    obj.done = false;
    data.push(obj);
    renderData();
    Counter();
    txt.value = "";
})

whole.addEventListener("click", function (e) {
    btnStatus = 0;
    renderData();
})

todo.addEventListener("click", function (e) {
    btnStatus = 1;
    todoData();
})

done.addEventListener("click", function (e) {
    btnStatus = 2;
    doneData();
})



//刪除
list.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") !== "delete") {
        return;
    }
    let num = e.target.getAttribute("data-num");
    data.splice(num, 1);
    chooseData();
    Counter();
})

//完成代辦
list.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") !== "check") {
        return;
    }
    let num = e.target.getAttribute("id");
    if (data[num].done == true) {
        data[num].done = false;
    } else if (data[num].done == false) {
        data[num].done = true;
    }
    chooseData();
    Counter();
})

//清除已完成項目
doneClear.addEventListener("click", function (e) {
    data.forEach(function (item, index) {
        if (item.done == true) {
            data.splice(index, 1);
            chooseData();
        }
    })
})

