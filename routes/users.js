const router = require('express').Router();
const userController = require('../controller/users');

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination 
 * - Select properties
 * - @route /api/v1/users?sort=["by","name"]
 * - @method GET
 * - @visibility Private
 */

/**
 * Get user by id or email
 */
router.get('/:userId', userController.getUserById)

/**
 * update user by id
 * @method PUT
 */
router.put('/:userId', () => { })

/**
 * delete user by id
 * @method PUT
 */
router.delete('/:userId', () => { })

router.get('/', userController.getUsers);

/**
 * create new user
 */
router.post('/', userController.postUser)



module.exports = router;