import conn from './connection';

/**
 * Lấy RoomId từ UserName
 * 
 */

 module.exports = (userid, callback) =>{
    const sql = 'SELECT c.chatroom_name, c.chatroom_id FROM chatroom c JOIN userchatroom uc on c.chatroom_id = uc.chatroom_id WHERE uc.user_id = ?';
    conn.aquire((err, con) =>{
        con.query(sql, [userid], (err, result, field) => {
            //console.log(result);
            callback(null, result);
            con.release();
        });
    });
 }