const serverIo = require('socket.io')();

// io ----> serverIo
// socket ----> serverSocket


let users = [];
serverIo.on('connection', serverSocket => {
    console.log('New user connected');

    serverSocket.on('login', data => {
        console.log('login ---> ', data);

        users.push({id: serverSocket.id, name: data.name})


        serverIo.emit('allUsers', {users})
    });


    serverSocket.on('message', data => {
        console.log(data);
        let user = users.find(x => x.id == serverSocket.id)
        serverSocket.broadcast.emit('newMessage', {...data, name: user.name})
    })





    serverSocket.on('disconnect', () => {
        // console.log(serverSocket);
        console.log('Got disconnect!');

        users = users.filter(x => x.id != serverSocket.id)
        
        serverIo.emit('allUsers', {users})
    })

});



module.exports = serverIo;