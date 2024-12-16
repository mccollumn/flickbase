const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

const grantsObject = {
  admin: {
    test: allRights,
  },
  user: {
    test: {
      "read:any": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };
