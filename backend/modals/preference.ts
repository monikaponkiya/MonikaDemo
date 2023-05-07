import { DataTypes, Model, Sequelize } from "sequelize";

export class Preference extends Model {

    public id!: number;
    public location!: string;
    public expectedCTC!: number;
    public currentCTC!: number;
    public noticePeriod!: number;
    public jobApplicationId!: number;

    public static initialize(sequelize: Sequelize) {
        return this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expectedCTC: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            currentCTC: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            noticePeriod: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            jobApplicationId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'Preferences',
            timestamps: false
        });
    }

    public static associate() {

    }
}