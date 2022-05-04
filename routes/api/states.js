const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const verifyStates = require('../../middleware/verifyStates')
//const verifyStates = require('../../middleware/verifyStates');

router.route('/')
    .get(statesController.getAllStates)


  //  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
   // .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:state')
    .get(statesController.getState)
router.route('/:state/capital/')
    .get(statesController.getStateCapital)
router.route('/:state/nickname/')
    .get(statesController.getStateNickname)
router.route('/:state/population/')
    .get(statesController.getStatePopulation)
router.route('/:state/admission/')
    .get(statesController.getStateAdmission)
//    .post()
//   .put()
//    .delete();

//router.route('/:state')
//    .get(stateController.getState);

//router.route('/:state')
//    .get(stateController.getState);

module.exports = router;