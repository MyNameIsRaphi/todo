let confirmInput = $("#inputPassword4");

let newPassword = $("#inputPassword5")

let submitButton = $("#signin")

let noMatchError = $("#noMatchError")

let noEmailError = $("#noEmailError")

let noPasswordError = $("#noPasswordError")


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
        else if (!validEmail){
            displayError(noEmailError)
        } else if (password.length < 8){
            displayError(noPasswordError)
        }
    }
)

function displayError(error) {
    error.css("display", "flex")
    error.css("justifyContent", "center")
    error.css("alignItems", "center")
}

function unDisplayAllErrors(){
     unDisplayError(noEmailError)
     unDisplayError(noMatchError)
     
     unDisplayError(noPasswordError)
}
function unDisplayError(error){
    error.css("display", "none")
}

function validateEmail(email) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }
  