// //存储代办事项
if (localStorage.todolist == undefined) {
    var todolist = [];
} else {
    var todolist = JSON.parse(localStorage.todolist);
    console.log(todolist);
}


var doinglist = document.querySelector('.doing .list')
var donelist = document.querySelector('.done .list')
var input = document.querySelector('#input');
var main = document.querySelector('.main');
var doingNum = document.querySelector('.doing .num');
var doneNum = document.querySelector('.done .num');



//定义函数
function render(todolist) {
    // 将数组对象转成json格式的字符串存储在本地的localstorage
    localStorage.todolist = JSON.stringify(todolist);
    doinglist.innerHTML = '';
    donelist.innerHTML = '';
    todolist.forEach(function(item, index) {

        var todoitem = document.createElement('div');
        todoitem.className = "todoitem";
        if (item.isDone) {
            todoitem.innerHTML = `
                <input type="checkbox" checked="checked" data-index="${index}" class="checkbox">
                <div class="content">` + item.content + `</div>
                <div class="del" data-index="${index}">删除</div>`
            donelist.appendChild(todoitem)
        } else {
            todoitem.innerHTML = `
                <input type="checkbox" data-index="${index}" class="checkbox">
                <div class="content">` + item.content + `</div>
                <div class="del" data-index="${index}">删除</div>`
            doinglist.appendChild(todoitem)
        }
    })

    //遍历todolist判断isDone的true和false的个数并赋值给span
    var doingnum = 0,
        donenum = 0;
    for (let i = 0; i < todolist.length; i++) {
        if (todolist[i].isDone == true) {
            donenum++;
        } else if (todolist[i].isDone == false) {
            doingnum++;
        } else {
            break
        }
    }
    doneNum.innerHTML = donenum;
    doingNum.innerHTML = doingnum;

}

//初始调用函数
render(todolist)

//输入框回车生成doing列表
input.addEventListener("keydown", function(e) {
    var value = input.value;
    if (event.key == "Enter" && input.value !== "") {
        var objItem = {
            content: value,
            isDone: false
        }
        todolist.push(objItem);
        render(todolist)
        input.value = "";
    }

})

//监听doing列表，点击后状态变为done
doinglist.onchange = function(e) {
    //console.log(e)
    //通过事件对象找到dom对象,获取索引值
    var index = parseInt(e.target.dataset.index);
    todolist[index].isDone = true;
    render(todolist)
}

//监听done列表，点击后状态变为doing
donelist.onchange = function(e) {
    //console.log(e)
    //通过事件对象找到dom对象,获取索引值
    var index = parseInt(e.target.dataset.index);
    //console.log(index)
    todolist[index].isDone = false;
    render(todolist);
}

//
main.addEventListener("click", function(e) {
    if (e.target.className == "del") {
        var index = parseInt(e.target.dataset.index);

        todolist.splice(index, 1);
        render(todolist);

    }

})