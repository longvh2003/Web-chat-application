import mysql from 'mysql';

/* Tạo một pool có method aquire là connect vào database để truy vấn. !Nhớ release sau khi xử dụng xong. Trả về một đối tượng */
function Connection(){
    this.pool = null;
    
    this.pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'webchat',
        multipleStatments: true
    })

    this.aquire = function(callback) {
        this.pool.getConnection(function(err, connection){
            if(err) throw err;
            callback(err, connection);
        });
    }
};
module.exports = new Connection();