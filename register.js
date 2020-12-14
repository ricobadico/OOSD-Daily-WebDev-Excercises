// Wrapper function that prompts user to confirm before calling real function
function confirmer(confirmedFunction, confirmWord){ 
    if (confirm("Would you really like to " + confirmWord + "?")) {
        confirmedFunction();
    }
    return false;
}

function resetForm() {
    const registerInputs = document.getElementById("registerForm").querySelectorAll("input") //Gets all input elements inside the form
    for(input of registerInputs){ //iterates through each input
        if(input.type != "submit"){ //ignores submit button (which uses "value" for its label!)
            input.value = null; //blanks value
        }
    }
}

function submitForm() {
    const registerInputs = document.getElementById("registerForm").querySelectorAll("input") //Gets all input elements inside the form
    
    let isValid = true; //tracks validity; switches to false if any rule is broken

    for(input of registerInputs){ //iterates through each input
        if ((input.getAttribute("required") == "required") //check to see if any element is required and also blank
            && input.value == ""){
                alert("Please enter your " + input.name + "."); //lets user know name of element that is not filled
                isValid = false; //leave function without getting to submit
                continue; //this stops the following validity functions from running for this input - if it's blank, that's enough info
        }
        // Check to see if any validity functions refer to this kind of input
        if(input.name == "password" && checkPass(input) == false){
            alert ("Please enter a password at least 8 characters long, containing at least one letter, number, and special character.");
            isValid = false;
        }
        if(input.name == "email" && checkEmail(input) == false){
            alert ("Please enter an email in the form recipientname@domainname.com");
            isValid = false;
        }
        if(input.name == "postalCode" && checkPostC(input) == false){
            alert ("Please enter a postal code in the form A1A1A1");
            isValid = false;
        }
    }
    if(isValid == true){ //check to ensure no validity rule switches this value to false
        const myform = document.getElementById("registerForm").submit(); //points to the form and tells it to submit			 
    }
}

//Validity Helper Functions
function checkPostC(currentInput){
    const userPostC = currentInput.value;
    const postCRegex = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/;
    if(postCRegex.test(userPostC)){
        return true;
    } else {
        return false;
    }
}

function checkEmail(currentInput){
    const userEmail = currentInput.value;
    const emailRegex = /^[a-z0-9._%+-]+@([a-z0-9-]+\.)+[a-z]{2,}$/i;
        if(emailRegex.test(userEmail)){
            return true;
        } else {
            return false;
        }
}

function checkPass(currentInput){
    const userPass = currentInput.value;
    const PassRegex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/; 
        if(PassRegex.test(userPass)){
            return true;
        } else {
            return false;
        }
}

//Input Tip Funcions
function showInputTip(currentInput){
    inputTip = currentInput.previousElementSibling; //accesses the hidden tip <p> element above the given input
    inputTip.style.display = "block";
}

function hideInputTip(currentInput){
    inputTip = currentInput.previousElementSibling;
    inputTip.style.display = "none";
}
