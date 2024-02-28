const { Group, User, GroupMember } = require('../models');

// Fetch all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [{ model: User, as: 'createdBy' }, { model: User, through: GroupMember, as: 'members' }]
    });
    res.send(groups);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: [{ model: User, as: 'createdBy' }, { model: User, through: GroupMember, as: 'members' }]
    });
    if (group) {
      res.send(group);
    } else {
      res.status(404).send({ message: 'Group not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const newGroup = await Group.create({
      ...req.body,
      createdBy: req.userId // Assuming the userId is available in request, e.g., from a middleware
    });
    res.status(201).send(newGroup);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update an existing group
exports.updateGroup = async (req, res) => {
  try {
    const updatedGroup = await Group.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedGroup[0]) {
      res.send(updatedGroup[1][0]);
    } else {
      res.status(404).send({ message: 'Group not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    const deleted = await Group.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.send({ message: 'Group deleted' });
    } else {
      res.status(404).send({ message: 'Group not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
