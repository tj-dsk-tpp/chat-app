const moment = require('moment');

function formatMessage(usrName, txt) {
    return {
        usrName,
        txt,
        time: moment().format('h:mm a')
    };
};

module.exports = formatMessage;