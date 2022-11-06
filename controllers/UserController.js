const m$user = require("../modules/user.module");
const { Router } = require("express");
const response = require("../helpers/response");
const userSession = require("../helpers/middleware");

const UserController = Router();

/**
 *List User
 *
 *http://localhost:8001/api/user/list
 */

UserController.get("/list", async (req, res) => {
   const list = await m$user.listUser();

   //response helper
   response.sendResponse(res, list);
});

/**
 *Create User
 *
 * @param {string} name
 * @param {string} password
 *http://localhost:8001/api/user/create
 */

UserController.post("/create", async (req, res) => {
   //req.body merupakan input dari client berupa json
   const add = await m$user.createUser(req.body);

   //response helper
   response.sendResponse(res, add);
});

/**
 * Update User berdasarkan login user
 *
 * @param {string} name
 * @param {string} password
 *
 *http://localhost:8001/api/user/update
 */

UserController.put("/update", userSession, async (req, res) => {
   //req.body merupakan input dari client berupa json
   const update = await m$user.updateUser({
      id: req.user.id,
      name: req.body.name,
      password: req.body.password,
   });

   //response helper
   response.sendResponse(res, update);
});

/**
 * Delete User berdasarkan input id dari user
 *
 * http://localhost:8001/api/user/:id
 */

UserController.delete("/:id", async (req, res) => {
   //req.prams merupakan input dari client berupa json
   const del = await m$user.deleteUser(Number(req.params.id));

   //response helper
   response.sendResponse(res, del);
});

module.exports = UserController;
