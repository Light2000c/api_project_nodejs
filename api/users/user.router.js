const express = require('express');

const router = express.Router()

const { checkToken } = require("../../auth/token_validation");

const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require('./user.controller');

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;