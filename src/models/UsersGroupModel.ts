import { sequelize } from '../data-access';
import { GroupModel } from './groupModel';
import { UserModel } from './userModel';

export const UsersGroupModel = sequelize.define('UserGroup', {});

GroupModel.belongsToMany(UserModel, { through: UsersGroupModel });
UserModel.belongsToMany(GroupModel, { through: UsersGroupModel });

(async function syncModel () {
    await UsersGroupModel.sync();
})();


export const addUsersToGroup = async (groupId: string, userId: string) => {
    try {
        await sequelize.transaction(async (t) => {
            const user = await UserModel.findByPk(userId, { transaction: t });
            const group = await GroupModel.findByPk(groupId, { transaction: t });

            if(user && group) {
                await UsersGroupModel.create({
                    UserId: userId,
                    GroupId: groupId
                }, { transaction: t });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
