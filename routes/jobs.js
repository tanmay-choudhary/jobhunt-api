const express = require("express");
const router = express.Router();
const db = require("../firebase");

const collection = db.collection("jobs");

router.post("/", async (req, res) => {
    const job = req.body;

    const doc = await collection.add({
        ...job,
        createdAt: new Date()
    });

    res.json({
        id: doc.id,
        message: "Created"
    });
});


router.get("/", async (req, res) => {

    const snapshot = await collection.get();

    const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.json(jobs);
});


router.get("/:id", async (req, res) => {

    const doc = await collection.doc(req.params.id).get();

    if (!doc.exists) {
        return res.status(404).json({
            message: "Not Found"
        });
    }

    res.json({
        id: doc.id,
        ...doc.data()
    });
});


router.put("/:id", async (req, res) => {

    await collection.doc(req.params.id).update(req.body);

    res.json({
        message: "Updated"
    });
});

router.delete("/:id", async (req, res) => {

    await collection.doc(req.params.id).delete();

    res.json({
        message: "Deleted"
    });
});

module.exports = router;