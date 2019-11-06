import conn from './connection';

/* Thêm msg vào trong database. */
module.exports = (msg, callback) =>{
    let username = msg.username;
    let message = msg.text;
    let chatRoomId = msg.roomid;
    console.log(message);
    const sql = 'INSERT INTO message (content, from_user, to_chatroom) VALUES ?;';
    let value = [
        [message, username, chatRoomId]
    ];
    conn.aquire((err, con) => {
        con.query(sql, [value], (err, result, fields) => {
            if (err) throw err;
            con.release();
        })
    })
}