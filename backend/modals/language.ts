import { DataTypes, Model, Sequelize } from "sequelize";

export class Language extends Model {

    public id!: number;
    public languageName!: string;
    public read!: boolean;
    public write!: boolean;
    public speak!: boolean;
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
            read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            write: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            speak: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            jobApplicationId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'Languages',
            timestamps: false
        });
    }

    public static associate() {

    }
}