let inputs = document.querySelectorAll("input")
let focusedInputs = []
const activators = document.querySelectorAll(".select-activator")
let options = document.querySelectorAll(".open > span")
const closed = new Event("closed")
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
options.forEach(element=>{
    console.log(element)
    element.addEventListener("mouseover", event=>{
        element.style.cursor = "pointer"
        element.style.backgroundColor="#ccc"
    });
    element.addEventListener("mouseout", event=>{
        element.style.cursor = "default"
        element.style.backgroundColor="white"
    })
    element.addEventListener("click", event=>{
        console.log(element.parentElement.children[1])
        element.style.color="grey"

        element.parentElement.parentElement.children[1].dispatchEvent(closed)
    })
})
activators.forEach(element=>{
    element.addEventListener("mouseover", event=>{
        element.style.cursor = "pointer"
    });
    element.addEventListener("mouseout", event=>{
        element.style.cursor = "default"
    })
    element.addEventListener("focus", event=>{
        console.log("triggered");
        element.parentElement.children[2].style.display="flex";
        console.log(
        element.parentElement.children[2])

    })
    element.addEventListener("closed", event=>{
        element.parentElement.children[2].style.display="none";

    })
})

