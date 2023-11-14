// const { pool } = require('../../config/database');

const mysql = require('mysql');

const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});


module.exports = {
    create: (data, callBack) => {


        pool.query(`Insert into registration(firstName, lastName, gender, email, password, number)
         values(?,?,?,?,?,?)`, [data.firstName, data.lastName, data.gender, data.email, data.password, data.number],
            (error, results, fields) => {

                
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            });
    },

    getUsers: (callBack) => {

        pool.query(`SELECT firstName, lastName, gender, email, password, number FROM registration`, [], (error, results) => {

            if(error){
                console.log(error);
                callBack(error);
            }

            return callBack(null, results)
        });
    },

    getUserById: (id, callBack) => {

        pool.query(`SELECT firstName, lastName, gender, email, password, number FROM registration where id = ?`, [id], (error, results) => {

            if(error){
                console.log(error);
                callBack(error);
            }
            

            return callBack(null, results[0])
        });
    },

    updateUser: (data, callBack) => {

        pool.query(`UPDATE registration set firstName = ?, lastName = ?, gender = ?, email= ?, password = ?, number = ? where id = ? `, 
        [data.firstName, data.lastName, data.gender, data.email, data.password, data.number, data.id], (error, results) => {

            if(error){
                console.log(error);
                callBack(error);
            }

            return callBack(null, results)
        }); 
    },

    deleteUser: (data, callBack) => {

        pool.query(`Delete FROM registration WHERE id = ?`, [data.id], (error, results) => {

            if(error){
                console.log(error);
                callBack(error);
            }

            return callBack(null, results[0])
        });
    },

    getUserByEmail: (email, callBack) => {

        pool.query(`SELECT * FROM registration where email = ?`, [email], (error, results) => {

            if(error){
                console.log(error);
                callBack(error);
            }
            

            return callBack(null, results[0])
        });
    },

};