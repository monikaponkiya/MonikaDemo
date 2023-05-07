import { DataTypes, Model, Sequelize } from "sequelize";

export class WorkExperience extends Model {

    public id!: number;
    public companyName!: string;
    public designation!: string;
    public fromDate!: Date;
    public toDate!: Date;
    public jobApplicationId!: number;

    public static initialize(sequelize: Sequelize) {
        return this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            companyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            designation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fromDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            toDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            jobApplicationId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'WorkExperiences',
            timestamps: false
        });
    }

    public static associate() {

    }
}