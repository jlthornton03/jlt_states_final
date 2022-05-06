const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const statesController = require('../../controllers/statesController');
const verifyStates = require('../../middleware/verifyStates');
const path = require('path');
const { verify } = require('crypto');


router.route('/')
    .get(statesController.getAllStates)


  //  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
   // .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:state')
    .get(verifyStates(), statesController.getState)
router.route('/:state/capital/')
    .get(verifyStates(), statesController.getStateCapital)
router.route('/:state/nickname/')
    .get(verifyStates(), statesController.getStateNickname)
router.route('/:state/population/')
    .get(verifyStates(), statesController.getStatePopulation)
router.route('/:state/admission/')
    .get(verifyStates(), statesController.getStateAdmission)
router.route('/:state/funfact/')
    .get(verifyStates(), statesController.getStateFunfact)
    .post(verifyStates(), statesController.createNewFunFact)
    .put(verifyStates(), statesController.updateFunFact)
    .delete(verifyStates(), statesController.deleteFunFact);


module.exports = router;