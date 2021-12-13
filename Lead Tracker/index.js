// refactor the code so that it use .addEventListener
// when you clicked the save input button

// Create Two Variables:-
// myLeads -> should be assigned to an empty array
// inputEl -> should be assigned to the text input field in id="input-el"

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const tapBtn = document.getElementById("tap-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(Leads){
    let listItems = ""
    for (let lead = 0; lead < Leads.length; lead++){
        listItems += `
        <li>
        <a href="${Leads[lead]}" target="_blank">${Leads[lead]}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}
//---------------------------------------------------------------
tapBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
    })
//---------------------------------------------------------------
// tapBtn.addEventListener("click", function () {
//         myLeads.push(window.location.href)
//         localStorage.setItem("myLeads", JSON.stringify(myLeads))
//         render(myLeads)
//     })
//---------------------------------------------------------------
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})
inputEl.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        myLeads.push(inputEl.value)
        inputEl.value=""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})
// HINTS:
// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.clear()