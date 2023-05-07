import { DataTypes, Model, Sequelize } from "sequelize";

export class JobApplication extends Model {

    public id!: number;
    public name!: string;
    public email!: string;
    public gender!: string;
    public contactNumber!: number;

    public static initialize(sequelize: Sequelize) {
        return this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contactNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'JobApplications',
            timestamps: false
        });
    }

    public static associate() {

    }
}