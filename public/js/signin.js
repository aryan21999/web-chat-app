function logIn() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
        axios.post("users/login", {
            email: email,
            password: password,
        })
        .then(function (response) {
            document.cookie = `token=${response.data.token}`
            console.log(response.data.token)
            console.log(response);
            location.replace('http://localhost:3000/index')
        })
        .catch(function (error) {
            console.log(error);
        })
}


//forgot password
function submit() {
    const email = document.getElementById("email").value
    const newPassword = document.getElementById("newPassword").value
        axios.patch("/users/forget", {
            email: email,
            newPassword: newPassword,
        })
        .then(function (response) {
            console.log(response);
            location.replace('http://localhost:3000')
        })
        .catch(function (error) {
            console.log(error)
        })
}