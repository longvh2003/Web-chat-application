import conn from './connection';

// module.exports = (userid, callback) =>{
//     const sql = 'select * from friends f inner join user u on f.frienduser = u.user_id where f.currentuser = ?;';
//     conn.aquire((err, con) =>{
//         if(err) throw err;
//         con.query(sql ,[userid], (err, result) =>{
//             if(err) throw err;
//             callback(null, result);
//         })
//         con.release();
//     })

//  }

 module.exports = 
 {
    getListFriend: (userid, callback) =>{
        const sql = 'select * from friends f inner join user u on f.frienduser = u.user_id where f.currentuser = ?;';
        conn.aquire((err, con) =>{
            if(err) throw err;
            con.query(sql ,[userid], (err, result) =>{
                if(err) throw err;
                callback(null, result);
            })
            con.release();
        })
    },

    getAllUser: (callback) =>{
        const sql = 'select username from user';
        conn.aquire((err, con) =>{
            if(err) throw err;
            con.query(sql, (err, result) =>{
                if(err) throw err;
                callback(null, result);
            })
            con.release();
        })
    }
}