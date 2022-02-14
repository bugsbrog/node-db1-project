const router = require('express').Router()
const {
    checkAccountPayload,
    checkAccountNameUnique,
    checkAccountId
} = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
    try {
        const getAcc = await Account.getAll()
        res.json(getAcc)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkAccountId, (req, res, next) => {
    res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    const name = req.body.name.trim()
    const budget = req.body.budget
        try {
            const createAccount = await Account.create({ name, budget })
            res.status(201).json(createAccount)
        } catch (err) {
            next(err)
        }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
    const { id } = req.params
    const { name, budget } = req.body
        try {
            const updateAcc = await Account.updateById(id, { name, budget })
            res.json(updateAcc)
        } catch (err) {
            next(err)
        }
});

router.delete('/:id', checkAccountId, async(req, res, next) => {
    const { id } = req.params
        try {
            await Account.deleteById(id)
            res.json(req.account)
        } catch (err) {
            next(err)
        }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;
