import { DataTypes } from 'sequelize';
import { sequelize } from '../data-access';

export const UserModel = sequelize.define('User', {
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
