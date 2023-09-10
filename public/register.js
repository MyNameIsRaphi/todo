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
    async (event) => {
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
            let reponse = await createUser(email.val(), password);
            if (reponse.created) {
                console.log("Created")
            } else {
                console.log(reponse.error);
                displayError(emailUsedError);
            }
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
    let options = {
        mehtod: "post",
        headers: { "content-type": "json" },
        body: JSON.stringify({ email: email, password: password })
    }
    let address = "https://localhost:3000/register"

    let response = await fetch(
        address,
        options
    )
    return response
}

