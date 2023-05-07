import { DataTypes, Model, Sequelize } from "sequelize";

export class TechnicalExperience extends Model {

    public id!: number;
    public technologyName!: string;
    public biginner!: string;
    public mediator!: string;
    public expert!: string;
    public jobApplicationId!: number;

    public static initialize(sequelize: Sequelize) {
        return this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            languageName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            biginner: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mediator: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expert: {
                type: DataTypes.STRING,
                allowNull: false
            },
            jobApplicationId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'TechnicalExperiences',
            timestamps: false
        });
    }

    public static associate() {

    }
}