import { DataTypes } from 'sequelize';
import { UserSequelize } from '../data-access/userDataAccess';

export const UserModel = UserSequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
});

(async function syncModel () {
    await UserModel.sync();
})();
