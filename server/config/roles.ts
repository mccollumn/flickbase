const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

const grantsObject = {
  admin: {
    // test: allRights,
    profile: allRights,
  },
  user: {
    // test: {
    //   "read:any": ["*"],
    // },
    profile: {
      "read:own": ["*"],
      "update:own": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };
