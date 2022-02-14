const db = require('../../data/db-config')

const getAll = () => {
  // SELECT * FROM Accounts;
  return db('Accounts')
}

const getById = id => {
  // SELECT * FROM Accounts
  // WHERE id = 1
  // WITHOUT .first() WE ALWAYS GET AN ARRAY WHICH COULD BE [] (empty)
  return db('Accounts').where('id', id).first()
}

const create = async account => {
  // INSERT INTO Accounts (name, budget) values ('Hannah', '1000')
  const [accId] = await db('Accounts').insert(account)
  return getById(accId)
}

const updateById = async (id, account) => {
  // UPDATE Accounts SET name: 'Lily', budget: 1500 WHERE id = 14
  await db('Accounts')
      .where('id', id)
      .update(account)
  return getById(id)
}

const deleteById = async id => {
  // DELETE FROM Accounts WHERE id = 14
  return  db('Accounts')
      .where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
