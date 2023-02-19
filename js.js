let inputs = document.querySelectorAll("input")
let focusedInputs = []
const activators = document.querySelectorAll(".select-activator")
const menus = document.querySelectorAll(".select-menu")
const closed = new Event("closed")
const chosenOptions = [0, 0]
const button = []
const optionsDictionary = [{
    0: "Elementary School",
    1: "Middle School",
    2: "High School"
},
{
    0: "1-5 years",
    1: "5-10 years",
    2: "10-20 years",
    3: "20+ years"
}       
];

const sumbitButton = document.querySelector(".links  button");

let currentPerson = window.localStorage.getItem("data")
if (currentPerson!=null){
    currentPerson = JSON.parse(currentPerson)
    inputs[0].value = currentPerson.firstName;
    inputs[1].value = currentPerson.lastName;

    activators[0].children[0].innerHTML = optionsDictionary[0][Number(currentPerson.profession)]
    activators[1].children[0].innerHtml = optionsDictionary[1][Number(currentPerson.level)]
    console.log(Number(currentPerson.profession))
}
else{
    menus[0].firstChild.value = optionsDictionary[0][0]
    menus[1].firstChild.value = optionsDictionary[1][0]
}

const person = {
    firstName: "",
    lastName: "",
    profession: "",
    level: ""
}
inputs.forEach(element => {
    //element.style.backgroundColor="#4555";
    element.style.border = "1px solid black"
    element.style.borderRadius = "5px"
    element.addEventListener("focus", (event) => {
        element.style.backgroundColor = "transparent"
        element.style.outlineColor = "#1360a0";
        element.parentElement.firstElementChild.style.color = "#1360a0"        //element.style.backgroundColor = "white"
        focusedInputs.push(element)
        console.log("sdfsadf", element.parentElement.firstElementChild)


    });
    element.addEventListener("blur", (event) => {
        console.log("sdfsadf2")
        element.parentElement.firstElementChild.style.color = "black"
        element.style.outlineColor = "default";
        focusedInputs.splice(focusedInputs.indexOf({ ...element }))
    });
    element.addEventListener("mouseover", (event) => {
        if (!focusedInputs.includes(element)) {
            console.log("sdfsadf1", focusedInputs)
            element.style.backgroundColor = "#4555";
        }
    })
    element.addEventListener("mouseout", (event) => {
        element.style.backgroundColor = "transparent"
    })
    element.addEventListener("error", (event) => {
        return
    })
})
menus.forEach(element => {
    let iterate = Array.prototype.indexOf.call(menus, element)
    element.children[0].addEventListener("focus", event => {
        element.children[1].style.display = "flex"
        element.children[1].focus()
    })
    element.children[1].tabIndex = -1
    let childNodes = [...element.children[1].children]
    console.log(childNodes)
    childNodes.forEach(child => {
        console.log(child)
        if ([...child.classList].includes("select-text")) {
            child.addEventListener("click", event => {
                childNodes.forEach(turnOff => {
                    if ([...turnOff.classList].includes("select-text")) {
                        turnOff.style.color = "black";
                    }
                })
                element.children[0].innerHTML = child.innerHTML;
                chosenOptions[Array.prototype.indexOf.call(menus, element)] = childNodes.indexOf(child) / 2 //divided by two because dividers exist
                child.style.color = "#1360a0"
                element.dispatchEvent(closed)
            })
            child.addEventListener("mouseover", event => {
                child.style.cursor = "pointer"
                child.style.backgroundColor = "grey"

            })
            child.addEventListener("mouseout", event => {
                child.style.cursor = "default"
                child.style.backgroundColor = "transparent"

            })
        }
    })
    element.children[1].addEventListener("focusout", event => {
        element.children[1].style.display = "none"
    })
    element.children[0].relatedTargets

    element.addEventListener("closed", event => {
        element.children[1].style.display = "none"
    })
})
sumbitButton.addEventListener("mouseover", event => {
    sumbitButton.style.cursor = "pointer"

})
sumbitButton.addEventListener("mouseout", event => {
    sumbitButton.style.cursor = "default"
})

sumbitButton.addEventListener("click", event => {
    if (inputs[0].value.trim().length > 0)
        person.firstName = inputs[0].value.trim();
    else
        console.log("ne");
    if (inputs[1].value.trim().length > 0)
        person.lastName = inputs[1].value.trim();
    else
        console.log("ne");
    person.profession = chosenOptions[0]
    person.level = chosenOptions[1]
    window.localStorage.setItem("data", JSON.stringify(person))
})