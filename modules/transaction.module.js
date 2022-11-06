const prisma = require("../helpers/database");
const Joi = require("joi");

class _trans {
   creatTransaction = async (body) => {
      try {
         const schema = Joi.object({
            userId: Joi.number().required(),
            cash_in: Joi.number().required(),
            cash_out: Joi.number().required(),
            description: Joi.string().required(),
         }).options({ abortEarly: false });

         const validation = schema.validate(body);

         if (validation.error) {
            const errorDetail = validation.error.details.map((detail) => detail.message);

            return {
               status: false,
               code: 420,
               error: errorDetail.join(", "),
            };
         }

         const add = await prisma.transaction.create({
            data: {
               UserId: body.userId,
               cash_in: body.cash_in,
               cash_out: body.cash_out,
               description: body.description,
            },
         });

         return {
            status: true,
            data: add,
         };
      } catch (error) {
         console.error("CreateTodo todo module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };

   listlogin = async (body) => {
      try {
         const schema = Joi.object({
            userId: Joi.number(),
         });

         const validation = schema.validate(body);

         if (validation.error) {
            const errorDetail = validation.error.detail.map((detail) => detail.message);

            return {
               status: false,
               code: 420,
               error: errorDetail.join(", "),
            };
         }

         const list = await prisma.user.findMany({
            where: {
               id: body.userId,
            },
            include: {
               transaction: true,
            },
         });

         return {
            status: true,
            data: list,
         };
      } catch (error) {
         console.error("listTodo todo module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };
}

module.exports = new _trans();
