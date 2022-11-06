const m$trans = require("../modules/transaction.module");
const { Router } = require("express");
const response = require("../helpers/response");
const userSession = require("../helpers/middleware");

const transController = Router();

/**
 * Creat Transaction dengan Login
 *
 * @param {number} cash_in
 * @param {number} cash_out
 * @param {string} description
 *
 * http://localhost:8001/api/trans/addtrans
 */

transController.post("/addtrans", userSession, async (req, res) => {
   const add = await m$trans.creatTransaction({
      userId: req.user.id,
      cash_in: req.body.cash_in,
      cash_out: req.body.cash_out,
      description: req.body.description,
   });

   response.sendResponse(res, add);
});

/**
 * Get List transaction using login
 *
 * http://localhost:8001/api/trans/list
 */

transController.get("/list", userSession, async (req, res) => {
   const list = await m$trans.listlogin({ userId: req.user.id });

   response.sendResponse(res, list);
});

module.exports = transController;
