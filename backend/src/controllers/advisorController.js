const db = require('../config/db');

exports.getAllAdvisors = async (req, res) => {
    try {
        const advisorsRef = db.collection('advisors');
        const snapshot = await advisorsRef.get();

        let advisors = [];
        snapshot.forEach(doc => {
            advisors.push({id: doc.id, ...doc.data()});
        });

        res.status(200).json(advisors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}