const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const statesController = require('../../controllers/statesController');
const verifyStates = require('../../middleware/verifyStates');
const path = require('path');
const { verify } = require('crypto');


router.route('/states/')
    .get(statesController.getAllStates)
router.route('/states/:state')
    .get(verifyStates(), statesController.getState)
router.route('/states/:state/capital/')
    .get(verifyStates(), statesController.getStateCapital)
router.route('/states/:state/nickname/')
    .get(verifyStates(), statesController.getStateNickname)
router.route('/states/:state/population/')
    .get(verifyStates(), statesController.getStatePopulation)
router.route('/states/:state/admission/')
    .get(verifyStates(), statesController.getStateAdmission)
router.route('/states/:state/funfact/')
    .get(verifyStates(), statesController.getStateFunfact)
    .post(verifyStates(), statesController.createNewFunFact)
    .put(verifyStates(), statesController.updateFunFact)
    .delete(verifyStates(), statesController.deleteFunFact);


module.exports = router;