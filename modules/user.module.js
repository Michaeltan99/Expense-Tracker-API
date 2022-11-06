const prisma = require("../helpers/database");
const Joi = require("joi");
const bcrypt = require("bcrypt");

class _user {
  listUser = async () => {
    try {
      const list = await prisma.user.findMany();

      return {
        status: true,

        data: list,
      };
    } catch (error) {
      console.log("listUser user  module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
  createUser = async (body) => {
    try {
      //validation input dari body
      const schema = Joi.object({
        name: Joi.string().required(),

        password: Joi.string().required(),
      });
      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        );

        return {
          status: false,
          code: 422,
          error: errorDetails.join(", "),
        };
      }
      body.password = bcrypt.hashSync(body.password, 10);

      const add = await prisma.user.create({
        data: {
          name: body.name,

          password: body.password,
        },
      });

      return {
        status: true,
        data: add,
      };
    } catch (error) {
      console.log("crateUser user module error", error);

      return {
        status: false,
        error,
      };
    }
  };

  updateUser = async (body) => {
    try {
      //validation input dari body
      const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string(),

        password: Joi.string(),
      });
      const validation = schema.validate(body);
      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        );

        return {
          status: false,
          code: 422,
          error: errorDetails.join(", "),
        };
      }
      if (body.password) {
        body.password = bcrypt.hashSync(body.password, 10);
      }

      const update = await prisma.user.update({
        where: {
          id: body.id,
        },
        data: {
          name: body.name,

          password: body.password,
        },
      });

      return {
        status: true,
        data: update,
      };
    } catch (error) {
      console.log("updateUser user module error", error);

      return {
        status: false,
        error,
      };
    }
  };

  deleteUser = async (id) => {
    try {
      //validation input dari body
      const schema = Joi.number().required();

      const validation = schema.validate(id);
      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        );

        return {
          status: false,
          code: 422,
          error: errorDetails.join(", "),
        };
      }
      const del = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return {
        status: true,
        data: del,
      };
    } catch (error) {
      console.log("deleteUser user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _user();
