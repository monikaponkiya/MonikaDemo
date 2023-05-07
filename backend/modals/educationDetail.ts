import { DataTypes, Model, Sequelize } from "sequelize";

export class EducationDetail extends Model {

    public id!: number;
    public name!: string;
    public university!: string;
    public year!: string;
    public cgpa!: string;
    public jobApplicationId!: number;

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
            university: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cgpa: {
                type: DataTypes.STRING,
                allowNull: false
            },
            jobApplicationId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'EducationDetails',
            timestamps: false
        });
    }

    public static associate() {
        
    }
}