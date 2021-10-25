//add friends
function addContact() {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  console.log(name)
  console.log(email)
  axios.post("/friends", {
    name: name,
    email: email
  }, {
    headers: {
      Authorization: ('Bearer ', ('; ' + document.cookie).split(`; token=`).pop().split(';')[0])
    }})
    .then(function (response) {
      console.log(response)
      console.log(response.data)
      location.replace("http://localhost:3000/index")
    })
    .catch(function (error) {
      console.log(error);
    });
}
