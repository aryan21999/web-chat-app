function addContact() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value  
    axios.post("/addFriends", {
     name: name,
     email: email
    },{
    headers: {
      Authorization : ('Bearer ', localStorage.getItem("token"))
    }})
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
  }