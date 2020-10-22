import db from '../../database/index';
import Sequelize from 'sequelize';

const files = db.define('files', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    file_url : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    path_buket: {
        type: Sequelize.STRING,
        allowNull: true,
    },
})
files.sync({force: false})
export default files;