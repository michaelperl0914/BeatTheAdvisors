const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();

        let users = [];
        snapshot.forEach(doc => {
            users.push({id: doc.id, ...doc.data()});
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
