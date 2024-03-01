const { User, Role, user_roles } = require('../models');

// Middleware to check if the user has one of the required roles
const checkRole = (roles) => async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming you have the user's ID stored in req.user
    const userRoles = await user_roles.findAll({
      where: { userId },
      include: [Role]
    });

    const userRoleNames = userRoles.map(ur => ur.Role.name);
    const hasRequiredRole = roles.some(role => userRoleNames.includes(role));

    if (!hasRequiredRole) {
      return res.status(403).send({ message: "Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "An error occurred while checking user permissions." });
  }
};

module.exports = { checkRole };
