import conn from './connection';

module.exports = (msg, callback) =>{
    let content = msg.text;
    let username = msg.username;
    let roomname = msg.roomname;
    let sql1 = 'select user_id from User where username = ?'
    let sql = 'select * from UserChatroom where chatroom_id = ? and user_id != ?'
    let sql2 = 'insert into notification(content, to_user, is_read) values ( ?, ?, ?)'
    conn.aquire((err, con) =>{
        con.query(sql1, [username], (err, result) =>{
            if(err) throw err;
            var id = result[0].user_id;
            con.query(sql, [roomname, id], (err, result)=>{
                if(err) throw err;
                //console.log(result[0].user_id);
                result.forEach(element => {
                    con.query(sql2, [content, element.user_id, false],(err, result)=>{
                        if(err) throw err;
                    });
                });
            })
            con.release();
        })
    })
}