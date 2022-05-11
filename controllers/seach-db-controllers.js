const express = require('express');
const router = express.Router();
const repo = require("../repository/kybRepo");

const prepareSearch = (req, res) => {
    console.log("handle query")
    // res.send("test");
    res.redirect("/search");
}

const handleSearch = (req, res) => {
    console.log("handle search post")
    // res.send("test");
    //const body = JSON.parse(req.body);
    console.log("-------------- body --------------");
    res.status(200).json({ status: 'OK' });
    res.redirect("/search");
}

const handleSearch2 = async (req, res) => {
    console.log("handle search get")
    // res.send("test");
    //const body = JSON.parse(req.body);
    console.log("-------------- query string --------------");
    console.log(req.query);
    console.log("-------------- lei --------------");
    console.log(req.query.lei);
    const kyb = await repo.findByLeiAndLegalName(req.query.lei, req.query.legalName, req.query.countryCode);
    console.log("----------------- kyb ------------------");
    console.log(kyb);
    //if there is no result return empty json
    if (!Array.isArray(kyb) || !kyb.length) {
        res.status(200).json('');
    }
    res.status(200).json(kyb[0]);
    //res.redirect("/search");
}

router.get('/', prepareSearch);

router.post('/search', handleSearch);

router.get('/searchGet', handleSearch2);

exports.searchDbController = router;

