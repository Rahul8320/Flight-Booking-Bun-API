"use strict";
import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Airplane extends Model {
    declare modelNumber: string;
    declare capacity: number;

    static associate(_models: any) {
      // define association here
    }
  }

  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Airplane",
    }
  );

  return Airplane;
};
