const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get username and room from url
const {
    username,
    room
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// console.log(username, room);

const socket = io();

//join chatroom
socket.emit('joinRoom', {
    username,
    room
});

//get room and users
socket.on('roomUsers', ({
    room,
    users
}) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //emitting a message to server
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});


const outputMessage = msg => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${msg.usrName} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.txt}
    </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to DOM
const outputRoomName = (room) => {
    roomName.innerText = room;
};

const outputUsers = (users) => {
    userList.innerHTML = `${users.map(usr=>`<li>${usr.name}</li>`).join('')}`;
};