import { DataTypes } from 'sequelize';
import { sequelize } from '../data-access';

export const GroupModel = sequelize.define('Group', {
    name: DataTypes.STRING,
    permissions: DataTypes.ARRAY(DataTypes.STRING),
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
});



(async function syncModel () {
    await GroupModel.sync();
})();
