import conn from './connection';

module.exports = (msg) =>{
    let username = msg.username;
    let message = msg.text;
    const sql = 'INSERT INTO message (content, from_user, to_chatroom) VALUES ?;';
    let value = [
        [message, username, 1]
    ];
    conn.aquire((err, con) => {
        con.query(sql, [value], (err, result, fields) => {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            con.release();
        })
    })
}