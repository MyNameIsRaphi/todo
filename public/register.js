

let confirmInput = $("#inputPassword4");

let newPassword = $("#inputPassword5")

let submitButton = $("#signin")

let noMatchError = $(".noMatchError")

let noEmailError = $(".noEmailError")

let noPasswordError = $(".noPasswordError")

let allErros = $(".error")

let emailUsedError = $(".emailUsedError")

let email = $(".enteredEmail")

submitButton.click(
     (event) => {
        unDisplayAllErrors()
        let validEmail = (validateEmail(email.val()))

        console.log(validEmail)

        let password = newPassword.val();
        let confirmedPassword = confirmInput.val();
        if (password != confirmedPassword) {
            console.log("Passwords don't match")

            displayError(noMatchError)

        }
        else if (!validEmail) {
            displayError(noEmailError)
        } else if (password.length < 8) {
            displayError(noPasswordError)
        } else {
            createUser(email.val(), password).then(
                (result) => {
                    console.log(result.created)
                    if (result.created){
                        console.log("User created")
                    }else {
                        displayError(emailUsedError)
                    }
                }
            )
            
    }
}
)


function unDisplayAllErrors() {
    allErros.css("visibility", "hidden")

}
function displayError(error) {
    error.css("visibility", "visible")
}
function validateEmail(email) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}


async function createUser(email, password) {
    console.log(email, password, " password")
    console.log("Creating user")
    let body = {
        email: email,
        password: password
    }
    let options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
    }
    let address = "https://localhost:3000/registering"

    let response = await fetch(
        address,
        options)
        
     response = response.json()
    return response
}

