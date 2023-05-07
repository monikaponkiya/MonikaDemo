import { Sequelize, Options } from 'sequelize'
import { User } from './modals/user';
import { JobApplication } from './modals/jobApplication';
import { EducationDetail } from './modals/educationDetail';
import { WorkExperience } from './modals/workExperience';
import { Language } from './modals/language';
import { TechnicalExperience } from './modals/technicalExperience';
import { Preference } from './modals/preference';

export function getConnection(): Sequelize {
    const hostName = process.env.HOST || 'localhost';
    const userName = process.env.USER || 'postgres';
    const password = process.env.PASSWORD || 'root';
    const database = process.env.DB || 'DB1';
    const port: number = 5432;
    const dialect = 'postgres';

    const operatorsAliases: any = false;
    const options: Options = {
        host: hostName,
        port,
        dialect,
        operatorsAliases,
        database,
        username: userName,
        password
    };

    const sequelize = new Sequelize(options);
    User.initialize(sequelize).sync().then(() => {
        User.bulkCreate([{
            email: 'admin@gmail.com',
            name: 'Admin',
            password: 'Apple123',
            type: 'admin'
        }]);
    });
    User.associate();

    JobApplication.initialize(sequelize);
    JobApplication.associate();

    EducationDetail.initialize(sequelize);
    EducationDetail.associate();

    WorkExperience.initialize(sequelize);
    WorkExperience.associate();

    Language.initialize(sequelize);
    Language.associate();

    TechnicalExperience.initialize(sequelize);
    TechnicalExperience.associate();

    Preference.initialize(sequelize);
    Preference.associate();

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.sequelize.sync({ force: false }).then(() => {
        console.log("Drop and re-sync db.");
    });
    return db;
}