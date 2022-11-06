const m$user = require("../modules/user.module");
const { Router } = require("express");
const response = require("../helpers/response");

const UserController = Router();

/** /
 *List User

 *http://localhost:8001/api/users
 **/

UserController.get("/", async (req, res) => {
  const list = await m$user.listUser();

  //response helper
  response.sendResponse(res, list);
});

/** /
 *Create User

 *http://localhost:8001/api/users
 **/

UserController.post("/", async (req, res) => {
  //req.body merupakan input dari client berupa json
  const add = await m$user.createUser(req.body);

  //response helper
  response.sendResponse(res, add);
});

/** /
 *Update User

 *http://localhost:8001/api/users
 **/

UserController.put("/", async (req, res) => {
  //req.body merupakan input dari client berupa json
  const update = await m$user.updateUser(req.body);

  //response helper
  response.sendResponse(res, update);
});

/** /
 *Delete User

 *http://localhost:8001/api/users/:id
 **/

UserController.delete("/:id", async (req, res) => {
  //req.prams merupakan input dari client berupa json
  const del = await m$user.deleteUser(Number(req.params.id));

  //response helper
  response.sendResponse(res, del);
});

module.exports = UserController;
