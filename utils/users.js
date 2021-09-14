const users = [];

// join user to chat
const userJoin = (id, name, room) => {
    const usr = {
        id,
        name,
        room
    };
    users.push(usr);
    // console.log(usr);
    return usr;
};

//get current user
const getCurrentUser = id => users.find(usr => usr.id === id);

//user leaves chat
const userLeave = id => {
    const index = users.findIndex(usr => usr.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

//get room users
const getRoomUsers = room => users.filter(usr => usr.room === room);

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};