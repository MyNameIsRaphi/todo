

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

    return response.isValid

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


async function startApp(email, password) {
    let body = {
        email: email,
        password: password
    }
    let options = {
        method: "GET",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
    }
    let address = "https://localhost:3000/todo"

    fetch(
        address,
        options
    )
}