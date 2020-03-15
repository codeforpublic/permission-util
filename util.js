const _ = require('lodash');
const match = (permission, requiredPermission) => {
  const pArr = permission.split(':');
  const rpArr = requiredPermission.split(':');
  for (let i = 0; i < rpArr.length; i++) {
    if (pArr[i] !== rpArr[i] && rpArr[i] !== '*') {
      return false;
    }
  }
  return true;
};

const extractInfo = (info, requiredPermissions) => {
  return _.pick(
    info,
    Object.keys(info).filter(key => _.some(requiredPermissions, p => match(key, p))),
  );
};

module.exports.extractInfo = extractInfo;
module.exports.match = match;
