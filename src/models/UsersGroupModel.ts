import { sequelize } from '../data-access';
import { GroupModel } from './groupModel';
import { UserModel } from './userModel';

export const UsersGroupModel = sequelize.define('UserGroup', {});

GroupModel.belongsToMany(UserModel, { through: UsersGroupModel });
UserModel.belongsToMany(GroupModel, { through: UsersGroupModel });

(async function syncModel () {
    await UsersGroupModel.sync();
})();
