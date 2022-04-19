$(document).ready(() => {
    const clientSocket = io();
    let name;

    $('#loginBtn').click(() => {
        name = $('#name').val();

        if (!name) {

        } else {
            $('#loginSection').css('display', 'none');
            $('#chatSection').css('display', 'flex')

            clientSocket.emit('login', {name});
        };
    });


    $('#sendBtn').click(() => {
        const message = $('#message').val();
        console.log(message);
        $('#messageBox').append(`
        <br>
        <div>
            <span class="green">you:</span>
            <br>
            <span>${message}</span>
        </div>
        `)

        clientSocket.emit('message', {message});
    })












    // on events
    clientSocket.on('allUsers', data => {
        console.log('all users --->', data);

        $('#onlineUsersList').html('');

        for (let i = 0; i < data.users.length; i++) {

            if (name == data.users[i].name) {
                $('#onlineUsersList').append(`<li class="green">${data.users[i].name}</li>`)
            } else {
                $('#onlineUsersList').append(`<li>${data.users[i].name}</li>`)
            }
        }
    });


    clientSocket.on('newMessage', data => {
        console.log(data);

        $('#messageBox').append(`
        <br>
        <div>
            <span>${data.name}:</span>
            <br>
            <span>${data.message}</span>
        </div>
        `)
    })
})