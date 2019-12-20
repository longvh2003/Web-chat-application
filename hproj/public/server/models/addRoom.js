import conn from './connection';

module.exports =
{
    AddRoom: (room, callback) =>{
        const sql1 = 'INSERT INTO chatroom (chatroom_name, chatroom_password, chatroom_description, member_num) VALUES (?, ?, ?, ?);';
        const sql2 = 'INSERT INTO userchatroom  VALUES (?, ?)';
        conn.aquire((err, con) =>{
            con.query(sql1, [room.name, room.pass, room.des, 5], (err, result, field) => {
                if(err) {
                    callback(err)
                    return;
                } else {
                    con.query(sql2, [room.userid, room.name], (err, result, field) => {
                        //console.log(result);
                        //if(err) throw err;
                        callback(err);
                    });        
                }
            });
            con.release();
        });
     },

     AcceptRoom: (data, callback)=>{
        const sql = 'SELECT chatroom_name FROM chatroom where chatroom_id = ?'
        const sql1 = 'INSERT INTO userchatroom VALUES (?, ?);';
        const sql2 = 'DELETE FROM notification WHERE id = ?';
        conn.aquire((err, con) =>{
            con.query(sql, [data.to_room], (err, result)=>{
                if(err) throw err;
                con.query(sql1, [data.to_user, result[0].chatroom_name], (err)=>{
                    if(err) throw err;
                    con.query(sql2, [data.id], (err)=>{
                        if(err) throw err;
                        callback(true);
                        con.release();
                    })
                })
            })
        });
     }

}