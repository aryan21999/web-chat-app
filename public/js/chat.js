const socket = io()

var ownerEmail
axios.get('/friends', {
    headers: {
        Authorization: ('Bearer ', localStorage.getItem("token"))
    },
})
    .then(function (response) {
        var friends = ''
        var flag = "card active"
        for (i = 0; i < response.data.length; i++) {
            id = response.data[i].email
            friends += `<div class="row-8"><button id="${id}" class="${flag}" onclick="openClick(event)" value="${response.data[i].name}"><h4>${response.data[i].name}</h4></button></div><br>`
            flag = "card"
        }
        document.getElementById('friends').innerHTML = friends
        document.getElementById('chatHeader').innerHTML = response.data[0].name
        document.getElementById('ownerId').innerHTML = response.data[0].owner
        ownerEmail = response.data[0].owner
        inboxMsg(window[document.getElementById('chatBody').innerHTML])
    })
    .catch(function (error) {
        console.log(error)
    });


    function openClick(e) {
        var cards = document.getElementsByClassName("card");
        for (i = 0; i < cards.length; i++) {
            cards[i].className = cards[i].className.replace(" active", "");
        }
        e.currentTarget.className += " active";
        document.getElementById('chatHeader').innerHTML = e.currentTarget.getAttribute('value')
        inboxMsg(window[e.currentTarget.getAttribute('value').split(" ").join("")])
    }
    
    // List All Chats
    function inboxMsg() {
        axios.get('/chats', {
                headers: {
                    Authorization: ('Bearer ', localStorage.getItem("token"))
                },
            })
            .then(function(response) {
                var chat = ''
                friendId = document.getElementsByClassName('active')[0].id
                for (i = 0; i < response.data.length; i++) {
                    if (response.data[i].sender == ownerEmail && response.data[i].receiver == friendId) {
                        chat += `<div class="chat-panel col-md-3 offset-md-9 chat-bubble chat-bubble--right" id=${i}><h4>${response.data[i].message}</h4></div>`
                    } else if (response.data[i].sender == friendId && response.data[i].receiver == ownerEmail) {
                        chat += `<div class="chat-panel col-md-3 chat-bubble chat-bubble--left" id=${i}><h4>${response.data[i].message}</h4></div>`
                    }
                }
                document.getElementById('chatBody').innerHTML = chat
            })
            .catch(function(error) {
                console.log(error)
            });
    }


    function chatUser() {
        const receiver = document.getElementsByClassName('active')[0].id
        console.log(receiver)
        const message = document.getElementById("message").value
        console.log(message)
        axios.post('/chats', {
                friend: receiver,
                message: message
            }, 
            {
                headers: {
                    Authorization: ('Bearer ', localStorage.getItem("token"))
                }
            })
            .then(function(response) {
                location.reload()
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    

function logOut() {
    axios.post('/users/logout', {}, {
            headers: {
                Authorization: ('Bearer ', localStorage.getItem("token"))
            }
        }).then((response) => {
            console.log("Logged Out")
            localStorage.removeItem("token");
            location.replace('/')
        }).catch((error) => {
            console.log(error)
            console.log(localStorage.getItem("token"))
        })
}