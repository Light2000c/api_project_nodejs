const { create, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');



module.exports = {
    createUser: (req, res) => {

        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            return res.status(200).json({
                status: 1,
                data: results,
            });
        });
    },


    getUsers: (req, res) => {


        getUsers((err, results) => {

            if (err) {
                console.log(err);
                return;
            }


            return res.json({
                status: 1,
                data: results,
            });
        });
    },

    getUserById: (req, res) => {


        const id = req.params.id;

        getUserById(id, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status: 0,
                    message: "Record not found",
                });
            }

            return res.json({
                status: 1,
                data: results,
            });
        });
    },



    updateUser: (req, res) => {

        const body = req.body;

        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status: 0,
                    message: "Failed to update user",
                });
            }

            return res.json({
                status: 1,
                message: "updated Successfully",
            });
        });
    },


    deleteUser: (req, res) => {

        const body = req.body;

        deleteUser(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status: 0,
                    message: "record not found",
                });
            }

            return res.json({
                status: 1,
                message: "user deleted Successfully",
            });
        });
    },


    login: (req, res) => {

        body = req.body;

        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status: 0,
                    message: "Invalid email or password",
                });
            }

            const result = compareSync(body.password, results.password);

            if (result) {
                result.password = undefined;
                const jsontoken = sign({ result: results }, "clint234", { expiresIn: "1h" });

                return res.json({
                    success: 1,
                    message: "Login Success",
                    token: jsontoken,
                });
            } else {

                return res.json({
                    success: 0,
                    message: "Invalid eamil od user",
                });
            }
        })
    }
}