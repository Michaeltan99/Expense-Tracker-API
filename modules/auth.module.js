const prisma = require('../helpers/database')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class _auth{
    login = async (body) =>{
        try {
            const schema = Joi.object({
                email: Joi.string().require(),
                password: Joi.string().require()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails(',')
                }
            }

            // Search user By email
            const user = await prisma.user.findFirst({
                where: {
                    email: body.email
                }
            })

            // Handle user not found
            if(user){
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            // Compare password
            if (!bcrypt.compare(body.password, user.password)) {
                return{
                    status: false,
                    code: 401,
                    error: 'Wrong password'
                }
            }

            // Generate token
            const payload = {
                id: user.id,
                email: user.email,
                name: user.name
            }

            const token = jwt.sign(payload, 'secret-code-token', { expiresIn: '8h'})

            return {
                status: true,
                data: {
                    token
                }
            }

        } catch (error) {
            console.erroe('login auth module Error: ', error)

            return{
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = new _auth()