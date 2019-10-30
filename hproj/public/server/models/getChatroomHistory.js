import conn from './connection';

/* Truy vấn vào database lấy tin nhắn theo chatroom. !!!Không thể dùng return tại hàm này */
module.exports = (callback) => {
    const sql = 'select * from message where to_chatroom = 1';
    conn.aquire((err, con) => {
        con.query(sql, (err, result, fields) => {
            //console.log(result);
            callback(null, result);
            con.release();
        });
    });
};