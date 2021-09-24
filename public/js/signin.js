function logIn() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
        axios.post("reg/login", {
            email: email,
            password: password,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function submit() {
    const email = document.getElementById("email").value
    const newPassword = document.getElementById("newPassword").value
        axios.patch("/reg/forget", {
            email: email,
            newPassword: newPassword,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error)
        })
}