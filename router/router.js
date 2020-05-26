const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

//GET ACCOUNTS
router.get('/', async (req, res) => {
    const accounts = await db
        .select()
        .from('accounts');

    if (accounts) {
        res.status(200).json(accounts);
    } else {
        res.status(500).json({ message: 'There was a problem fetching the accounts.' });
    }
});

//GET ACCOUNTS BY ID
router.get('/:id', async (req, res) => {
    const account = await db
        .select()
        .from('accounts')
        .where({ id: req.params.id })
        .first()

    if (account) {
        res.status(200).json(account);
    } else {
        res.status(500).json({ message: 'There was a problem finding the account' });
    }
})

//CREATE AN ACCOUNT
router.post('/', async (req, res) => {
    const body = req.body;
    const newAccount = await db('accounts').insert(body)

    if (!body.name || !body.budget) {
        res.status(500).json({ message: 'You must provide a name and budget.' });
    }

    if (newAccount) {
        console.log(newAccount)
        res.status(200).json(newAccount);
    } else {
        res.status(500).json({ message: 'There was a problem creating an account.' });
    }
})

//UPDATE ACCOUNT
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if (!changes.name && !changes.budget) {
        res.status(500).json({ message: 'You must provide a name or a budget.' });
    }

    const updated = await db('accounts')
        .where({id})
        .update(changes)

    if (updated) {
        res.status(200).json(updated);
    } else {
        res.status(500).json({ message: 'There was a problem updating the account.' });
    }
})

//DELETE ACCOUNT
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const deleted = await db('accounts')
        .where({id})
        .delete({id})

    if (deleted) {
        res.status(200).json(deleted);
    } else {
        res.status(500).json({ message: 'There was a problem with deleting the account.' });
    }
})

module.exports = router;