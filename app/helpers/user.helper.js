const faker = require("faker");
const { hashPassword } = require("./auth.helper");
// config language for faker
faker.locale = "vi";

const adminList = [
  {
    id: 1,
    fullName: "Doan Admin",
    sex: "MALE",
    role: "ADMIN",
    email: "1951150012@sv.ut.edu.vn",
    password: hashPassword("123456"),
    avatar: undefined,
    createdAt: "2022-06-25",
    updatedAt: "2022-06-25",
  },
  {
    id: 2,
    fullName: "Tan Admin",
    sex: "MALE",
    role: "ADMIN",
    email: "1951150086@sv.ut.edu.vn",
    password: hashPassword("123456"),
    avatar: undefined,
    createdAt: "2022-06-25",
    updatedAt: "2022-06-25",
  },
];
const userList = [];

const fakeUserDB = (size = 10) => {
  [...new Array(size)].map((user) => {
    userList.push({
      // id: Math.floor(Math.random() * 1000),
      fullName: faker.name.findName(),
      sex: "MALE",
      role: "CLIENT",
      email: faker.internet.email().toLowerCase(),
      password: hashPassword("123456"),
      avatar: undefined,
      createdAt: "2022-06-25",
      updatedAt: "2022-06-25",
    });
  });
  console.log({ userList });
  return [...adminList, ...userList];
};

module.exports = {
  fakeUserDB,
};
