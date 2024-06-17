let lists = [];

const output = document.getElementById("divInput")
const input = document.getElementById("input")
const key = "lists";

const renderItems = () => {

    output.innerHTML = null;

    for(const [index,list] of Object.entries(lists)){

        const container = document.createElement("div")

        const text = document.createElement("p")
        text.style.display = "inline";
        
        text.textContent = list;

        const DeleteButton = document.createElement("button")
        DeleteButton.textContent = "x";
        DeleteButton.style.borderRadius = "50px";
        DeleteButton.style.border = "none";
        DeleteButton.style.color = "grey"    
        DeleteButton.style.backgroundColor = "white"    
        DeleteButton.style.marginLeft = "10px"; 
        DeleteButton.onclick = () => deleteTask(index);

        container.appendChild(text)
        container.appendChild(DeleteButton)

        output.appendChild(container)
    }
}

const addTask = () => {
    const value = input.value;
    if(!value){
        alert("empty")
        return
    }
    lists.push(value)
    renderItems()
    input.value = ""
    saveTask()
}

const deleteTask = (index) => {
    lists.splice(index,1)
    renderItems()
    saveTask()
} 

const loadTask = () =>{
    const oldData = localStorage.getItem(key)
    if(oldData){
        lists = JSON.parse(oldData)
    }
    renderItems()

}

const saveTask = () =>{
    const data = JSON.stringify(lists)
    localStorage.setItem(key,data)

}

document.addEventListener("DOMContentLoaded",loadTask)
