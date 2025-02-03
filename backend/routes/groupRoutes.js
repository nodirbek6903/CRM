const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/', groupController.getGroups); // Get all groups
router.get('/:id', groupController.getGroup); // Get a single group by ID
router.post('/', groupController.createGroup); // Create a new group
router.put('/:id', groupController.updateGroup); // Update a group by ID
router.delete('/:id', groupController.deleteGroup); // Delete a group by ID
router.get('/courses/:courseId', groupController.fetchGroupsByCourse); // Get all groups by courses

module.exports = router;
