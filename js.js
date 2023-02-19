let inputs = document.querySelectorAll("input")
let focusedInputs = []
const activators = document.querySelectorAll(".select-activator")
const menus = document.querySelectorAll(".select-menu")
let options = document.querySelectorAll(".open > span")
const closed = new Event("closed")
const chosenOptions = [0, 0]
const person = {
    firstName: "",
    secondName: "",
    profession: "",
    level: ""
}
inputs.forEach(element=>{
    console.log(options)
    //element.style.backgroundColor="#4555";
    element.style.border = "1px solid black"
    element.style.borderRadius = "5px"
    element.addEventListener("focus", (event)=>{
        element.style.backgroundColor="transparent"
        element.style.outlineColor="#1360a0";
        element.parentElement.firstElementChild.style.color="#1360a0"        //element.style.backgroundColor = "white"
        focusedInputs.push(element)
        console.log("sdfsadf",  element.parentElement.firstElementChild)


    });
    element.addEventListener("blur", (event)=>{
        console.log("sdfsadf2")
        element.parentElement.firstElementChild.style.color="black" 
        element.style.outlineColor="default";
        focusedInputs.splice(focusedInputs.indexOf({...element}))
    });
    element.addEventListener("mouseover", (event)=>{
        if (!focusedInputs.includes(element)){
        console.log("sdfsadf1", focusedInputs)
        element.style.backgroundColor="#4555";
        }
    })
    element.addEventListener("mouseout", (event)=>{
        element.style.backgroundColor = "transparent"
    })
    element.addEventListener("error", (event)=>{
        return
    })
})
menus.forEach(element=>{
    let iterate = Array.prototype.indexOf.call(menus, element)
    element.children[0].addEventListener("focus", event=>{
        element.children[1].style.display="flex"
        element.children[1].focus()
    })
    element.children[1].tabIndex = -1
    element.children[1].childNodes.forEach(child=>{
        child.addEventListener("click", event=>{
            child.style.color="grey"
            element.dispatchEvent(closed)
            element.children[0].innerHTML=child.innerHTML;
            chosenOptions[Array.prototype.indexOf.call(menus, element)]=(element.children[1].childNodes.indexOf(child))
            element.children[1].childNodes.forEach(turnOff =>{
                if (element.children.childNodes.indexOf(turnOff)!=chosenOptions[Array.prototype.indexOf.call(menus, element)]){
                    turnOff.color = "black"
                }
            })
        })
        child.addEventListener("mouseover", event=>{
            child.style.cursor="pointer"
            child.style.backgroundColor="grey"

        })
        child.addEventListener("mouseout", event=>{
            child.style.cursor="default"
            child.style.backgroundColor="transparent"

        })
    })
    element.children[1].addEventListener("focusout", event=>{
        element.children[1].style.display="none"
    })
    element.children[0].relatedTargets
    
    element.addEventListener("closed", event=>{
        element.children[1].style.display="none"
    })
})
