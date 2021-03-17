var express = require('express');
var router = express.Router();

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t SESSION controller - Time: ', Date().toString());
    next();
})

/////..................................................
router.get( '/', sessionPage );
function sessionPage(req, res) {
	res.send("sESSION");
}

/////..................................................
router.get( '/set', setSessionPage );
function setSessionPage(req, res) {
	req.session.User = {
        website: 'ATN-Shop.com',
        author: 'NNTu-GW',
        language: 'Node.js'
    }

    return res.status(200).json({status: 'success'})
}

/////..................................................
router.get( '/get', getSessionPage );
function getSessionPage(req, res) {
	if(req.session.User){
        return res.status(200).json({status: 'success', session: req.session.User})
    }
    return res.status(200).json({status: 'error', session: 'Không có session'})
}

/////..................................................
router.get( '/del', delSessionPage );
function delSessionPage(req, res) {
	req.session.destroy(function(err) {
        return res.status(200).json({status: 'success', session: ' đã xóa, không còn session !'})
    })
}


/// --- EXports
module.exports = router;

