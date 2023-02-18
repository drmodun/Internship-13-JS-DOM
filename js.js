let inputs = document.querySelectorAll("input")
let focusedInputs = []
inputs.forEach(element=>{
    element.addEventListener("focus", (event)=>{
        console.log("sdfsadf")
        element.style.outlineColor="#1360a0";
        element.style.backgroundColor = "white"
        focusedInputs.push({...element})
    });
    element.addEventListener("blur", (event)=>{
        console.log("sdfsadf1")
        element.style.outlineColor="default";
        element.style.outlineStyle="default"
        focusedInputs.splice(focusudInputs.IndexOf({...element}))
    });
    element.addEventListener("mouseover", (event)=>{
        if (!focusedInputs.includes(element))
        console.log("sdfsadf1")
        //element.style.backgroundColor="#1360a0";
    })
    element.addEventListener("mouseout", (event)=>{
        //element.style.backgroundColor = "white"
    })

})