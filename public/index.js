

let submitButton = $("#submit")


async function validateUserLogin(email, password) {

    let path = "/login"

    let address = "https://localhost:3000" + path

    let requestBody = {
        password: password,
        email: email
    }

    let options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody)
    }

    let response = await fetch(
        address,
        options
    )

    response = response.json()

    return requestBody.isValid

}

async function goToStartPage(email, password){
    let path = "/todo"
    let address = "localhost:3000" + password

    let requestBody = {
        email: email
    }
    let options = {
        method: "POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(requestBody)
    }
    let response = await fetch(
        address,
        options
    )
    
}

submitButton.click((event) => {
    let password = $(".password").val()
    console.log("Validating")
    let email = $(".email").val()

    validateUserLogin(email, password).then((valid) => {
        if (valid){
            goToStartPage(email,password)
        }else {
            console.log("invalid")
            let invalidMessage = $(".isvalid")
            invalidMessage.css("display","block")
        }
    })
})
