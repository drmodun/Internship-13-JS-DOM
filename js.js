let inputs = document.querySelectorAll("input")
let focusedInputs = []
const activators = document.querySelectorAll(".select-activator")
const menus = document.querySelectorAll(".select-menu")
const closed = new Event("closed")
const chosenOptions = [0, 0]
const button = []
const invalidInputs = [];
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
if (currentPerson != null) {
    currentPerson = JSON.parse(currentPerson)
    inputs[0].value = currentPerson.firstName;
    inputs[1].value = currentPerson.lastName;

    activators[0].children[0].innerHTML = optionsDictionary[0][Number(currentPerson.profession)]
    activators[1].children[0].innerHTML = optionsDictionary[1][Number(currentPerson.level)]
    chosenOptions[0] = Number(currentPerson.profession);
    chosenOptions[1] = Number(currentPerson.level);
    menus[0].children[1].children[chosenOptions[0] * 2].style.color = "#1360a0"
    menus[1].children[1].children[chosenOptions[1] * 2].style.color = "#1360a0"
}
else {
    menus[0].firstChild.value = optionsDictionary[0][0]
    menus[1].firstChild.value = optionsDictionary[1][0]
    menus[0].children[1].children[0].style.color = "#1360a0"
    menus[1].children[1].children[0].style.color = "#1360a0"
}

const person = {
    firstName: "",
    lastName: "",
    profession: "",
    level: ""
}
inputs.forEach(element => {
    element.style.border = "1px solid black"
    element.style.borderRadius = "5px"
    element.addEventListener("focus", (event) => {
        element.style.outline = "none"
        if (!invalidInputs.includes(element)) {
            element.style.backgroundColor = "transparent"
            element.style.borderColor = "#1360a0";
            element.parentElement.firstElementChild.style.color = "#1360a0"
            focusedInputs.push(element)
        }
    });
    element.addEventListener("focusout", (event) => {
        element.parentElement.firstElementChild.style.color = "black"
        if (element.value.trim().length == 0) {
            element.parentElement.lastElementChild.style.display = "flex";
            element.style.borderColor = "#b30000"
            invalidInputs.push(element)
        }
        else {
            element.parentElement.lastElementChild.style.display = "none";
            element.style.borderColor = "black"
            if (invalidInputs.includes(element))
                invalidInputs.splice(invalidInputs.indexOf(element))
        }
        focusedInputs.splice(focusedInputs.indexOf({ ...element }))
    });
    element.addEventListener("mouseover", (event) => {
        if (!focusedInputs.includes(element)) {
            element.style.backgroundColor = "#4555";
        }
    })
    element.addEventListener("mouseout", (event) => {
        element.style.backgroundColor = "transparent"
    })
})
let menusIndex = [...menus]
menus.forEach(element => {
    element.children[1].style.display = "flex";
    element.children[1].style.visibility = "hidden";
    element.children[0].addEventListener("focus", event => {
        element.children[1].style.visibility = "visible"
        element.children[1].focus();
    })
    element.children[1].tabIndex = -1
    let childNodes = [...element.children[1].children]
    childNodes.forEach(child => {
        if ([...child.classList].includes("select-text")) {
            child.addEventListener("click", event => {
                childNodes.forEach(turnOff => {
                    if ([...turnOff.classList].includes("select-text")) {
                        turnOff.style.color = "black";
                    }
                })
                element.children[0].children[0].innerHTML = child.innerHTML;
                chosenOptions[menusIndex.indexOf(element)] = childNodes.indexOf(child) / 2
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
        element.children[1].style.visibility = "hidden"
    })

    element.addEventListener("closed", event => {
        element.children[1].style.visibility = "hidden"
    })
})
sumbitButton.addEventListener("mouseover", event => {
    sumbitButton.style.cursor = "pointer"
    sumbitButton.style.backgroundColor = "#1360a0"

})
sumbitButton.addEventListener("mouseout", event => {
    sumbitButton.style.cursor = "default"
    sumbitButton.style.backgroundColor = "#00447c"

})

sumbitButton.addEventListener("click", event => {
    if (!inputs[0].value.trim().length > 0)
        inputs[0].dispatchEvent("focusout");
    else {
        if (!inputs[1].value.trim().length > 0)
            inputs[1].dispatchEvent("focusout");
        else {
            person.firstName = inputs[0].value.trim();
            person.lastName = inputs[1].value.trim();
            person.profession = chosenOptions[0]
            person.level = chosenOptions[1]
            window.localStorage.setItem("data", JSON.stringify(person))
        }
    }
})