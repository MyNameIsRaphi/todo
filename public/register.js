let confirmInput = $(".confirmedPassword");

let newPassword = $(".newPassword")

let submitButton = $("#signin")

let noMatchError = $(".noMatchError")

submitButton.click(
    (event) => {
        
        let password = newPassword.val();
        let confirmedPassword = confirmInput.val();
        if (password !== confirmedPassword){
            console.log("Passwords don't match")
        }
    }
)