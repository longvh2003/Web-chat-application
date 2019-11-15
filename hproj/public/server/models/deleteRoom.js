import conn from './connection';

module.exports = (roomid) =>{
    const sql = 'DELETE FROM chatroom WHERE chatroom_id = ?';
    conn.aquire((err, con) =>{
        con.query(sql, [roomid], (err, result, field) => {
            //console.log(result);
            if(err) throw err;
            console.log('success1');
        });
        con.release();
    });
 }