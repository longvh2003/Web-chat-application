import conn from './connection';

module.exports = 
{
    addMessageNotification: (msg, callback) =>{
        let content = msg.text;
        let username = msg.username;
        let roomname = msg.roomname;
        let sql1 = 'select user_id from User where username = ?'
        let sql = 'select * from UserChatroom where chatroom_id = ? and user_id != ?'
        let sql2 = 'insert into notification(content, type, to_user, is_read) values ( ?, ?, ?, ?)'
        conn.aquire((err, con) =>{
            con.query(sql1, [username], (err, result) =>{
                if(err) throw err;
                var id = result[0].user_id;
                con.query(sql, [roomname, id], (err, result)=>{
                    if(err) throw err;
                    result.forEach(element => {
                        con.query(sql2, [content, 1, element.user_id, false],(err)=>{
                            if(err) throw err;
                        });
                    });
                })
                con.release();
            })
        })
    },

    addRoomInviteNotification: (data, callback) =>{
        let content = 'Bạn được mời vào room: ' + data.roomname;
        let id = data.id;
        let testsql = 'SELECT * FROM notification WHERE to_user = ? AND to_room = ?';
        let sql = 'INSERT INTO notification(content, type, to_user, is_read, to_room) values (?, ?, ?, ?, ?);'
        conn.aquire((err, con)=>{
            con.query(testsql, [id, data.roomid], (err, result)=>{
                if(err) throw err;
                if(result.length) {
                }
                else {
                    con.query(sql, [content, 2, id, false, data.roomid], (err)=>{
                        if(err) throw err;
                        callback(err);
                        
                    })
                    con.release();        
                }
            })
        })
    },

    getRoomInvite: (id, callback)=>{
        let sql = 'SELECT * FROM notification WHERE to_user=? AND is_read = ? AND type = ?';
        conn.aquire((err, con)=>{
            con.query(sql, [id, false, 2], (err, result) => {
                if(err) throw err;
                callback(null, result);
                con.release();
            })
        })

    }

}