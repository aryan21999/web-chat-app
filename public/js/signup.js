function signUp() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
        axios.post("/reg", {
            name: name,
            email: email,
            password: password,
        })
        .then(function (response) {
            console.log(response);
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}