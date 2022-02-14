const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
    const { name, budget }= req.body
        if (name === undefined || budget === undefined) {
            next({
                status: 400,
                message: 'name and budget are required'
            })
        } else if (name.trim().length < 3 || name.trim().length > 100) {
            next({
                status: 400,
                message: 'name of account must be between 3 and 100'
            })
        } else if (typeof budget !== 'number') {
            next({
                status: 400,
                message: 'budget of account must be a number'
            })
        } else if (budget < 0 || budget > 1000000) {
            next({
                status: 400,
                message: 'budget of account is too large or too small'
            })
        } else {
            next()
        }
}

exports.checkAccountNameUnique = async (req, res, next) => {
    try {
        // WHY DO WE HAVE TO DO IT THIS WAY?!
        const exists = await db('Accounts')
            .where('name', req.body.name.trim())
            .first()
        if (!exists) {
            next({
                status: 400,
                message: 'that name is taken'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

exports.checkAccountId = async (req, res, next) => {
    const { id } = req.params
        try {
            const account = await Accounts.getById(id)
                if (account) {
                    req.account = account
                    next()
                } else {
                    next({
                        status: 400,
                        message: 'account not found'
                    })
                }
        } catch (err) {
            next(err)
        }
}
