// Todo 모델
// 시퀄라이즈 모델과 mysql todo table 연결
const Todo = function (Sequelize, DataTypes) {
  // Sequelize.define()
  // - param1 : 모델 이름
  // - param2 : 컬럼 정의
  // = param3 : 모델 옵션
  const model = Sequelize.define("todo", {
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allownull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allownull: false,
      defaultValue: false,
    },
  });

  return model;
};

module.exports = Todo;
