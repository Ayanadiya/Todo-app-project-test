const todoremlist=document.getElementById("todoremaining");
const tododonelist=document.getElementById("tododone");
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/a6c910cf0ee141c1b4d2bfb3410516ff/todoremaining")
    .then((response)=>{
        for(var i=0; i<response.data.length; i++)
        {
            displaytodorem(response.data[i]);
        }
    })
    .catch(error=>console.log(error));
    axios.get("https://crudcrud.com/api/a6c910cf0ee141c1b4d2bfb3410516ff/tododone")
    .then((response)=>{
        for(var i=0; i<response.data.length; i++)
            {
                displaytododone(response.data[i]);
            }
    })
    .catch(error=>console.log(error));
})
function handleFormSubmit(event){
    event.preventDefault();
    const todoitem={
        todoname:event.target.todoname.value,
        tododesc:event.target.description.value,
    }
   axios.post("https://crudcrud.com/api/a6c910cf0ee141c1b4d2bfb3410516ff/todoremaining",todoitem)
   .then((response)=>{
    console.log(response);
    displaytodorem(response.data);
    event.target.reset();
   })
   .catch(error=>console.log(error));
}

function displaytodorem(todoitem){
    const listitem=document.createElement("li");
    listitem.textContent=`Todoname:${todoitem.todoname}, Tododescription:${todoitem.tododesc}`;
    const statusBtn = document.createElement("button");
    statusBtn.textContent = "Mark as Done";
    statusBtn.onclick = () => markAsDone(todoitem, listitem);
    listitem.appendChild(statusBtn);
    const deletebtn=document.createElement("button");
    deletebtn.textContent="X";
    listitem.appendChild(deletebtn);
    todoremlist.appendChild(listitem);
    deletebtn.onclick=()=>handleDelete(todoitem._id,listitem);
}
function displaytododone(todoitem) {
    const listitem = document.createElement("li");
    listitem.textContent = `Todoname: ${todoitem.todoname}, Tododescription: ${todoitem.tododesc}`;

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "X";
    deletebtn.onclick = () => handleDeletedone(todoitem._id, listitem);
    listitem.appendChild(deletebtn);

    tododonelist.appendChild(listitem);
}
function markAsDone(todoitem, listitem) {
    const doneItem = {
        todoname: todoitem.todoname,
        tododesc: todoitem.tododesc,
    };
    axios.post(`https://crudcrud.com/api/a6c910cf0ee141c1b4d2bfb3410516ff/tododone`, doneItem)
        .then(() => {
            handleDelete(todoitem._id, listitem);
            displaytododone(doneItem)
        })
        .catch(error => console.log(error));
}
function handleDelete(itemid, listitem) {
    axios.delete(`https://crudcrud.com/api/a6c910cf0ee141c1b4d2bfb3410516ff/todoremaining/${itemid}`)
        .then(() => {
            listitem.remove();
        })
        .catch(error => console.log(error));
}
function handleDeletedone(itemid, listitem) {
    axios.delete(`https://crudcrud.com/api/a6c910cf0ee141c1b4d2bfb3410516ff/tododone/${itemid}`)
        .then(() => {
            listitem.remove();
        })
        .catch(error => console.log(error));
}