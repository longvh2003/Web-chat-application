import conn from './connection';

/* Truy vấn vào database lấy tin nhắn theo chatroom. !!!Không thể dùng return tại hàm này */
module.exports = (roomid, callback) => {
    const sql = 'select * from message join user on message.from_user=user.username where to_chatroom=?';
    conn.aquire((err, con) => {
        con.query(sql,[roomid], (err, result, fields) => {
            callback(null, result);
            con.release();
        });
    });
};