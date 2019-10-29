import conn from './connection';
import { callbackify } from 'util';

module.exports = (callback) => {
    const sql = 'select * from message where to_chatroom = 1';
    conn.aquire((err, con) => {
        con.query(sql, (err, result, fields) => {
            //console.log(result);
            callback(null, result);
        });
    });
};