import conn from './connection';

module.exports = (userid, callback) =>{
    let sql = 'select * from notification where to_user = ? and is_read = ?';
    conn.aquire((err, con)=>{
        con.query(sql, [userid, false], (err, result)=>{
            if(err) throw err;
            callback(null, result);
            con.release();
        })
    })
}