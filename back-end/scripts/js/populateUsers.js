const { prisma } = require("../../prisma/client");
const { LookerNodeSDK } = require("@looker/sdk-node");
const bcrypt = require("bcrypt");

const getUsersFromLookerWorkshop = async () => {
  try {
    const sdk = LookerNodeSDK.init40();
    const users = await sdk.ok(
      sdk.all_group_users({
        group_id: "5",
        field: "email, display_name, first_name, last_name",
      })
    );
    const bannedEmails = [
      "julio.mendo@clusterdesign.io",
      "wellingtontocontato@gmail.com",
      "wellington.oliveira@clusterdesign.io",
    ];
    const filteredUsers = users.filter((user) => !bannedEmails.includes(user.email));
    return filteredUsers;
  } catch (error) {
    console.error(error, "error");
  }
};

const populateUsers = async (users) => {
  const filledUsers = await Promise.all(
    users.map(async (user) => {
      const password = await createPasswordHash(user.email);
      return {
        email: user.email,
        name: user?.display_name || user?.first_name || user.email,
        password,
      };
    })
  );

  try {
    await prisma.user.createMany({
      data: filledUsers,
    });
  } catch (error) {
    console.error(error, "error");
  }
};

const createPasswordHash = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }
};

const init = async () => {
  try {
    const users = await getUsersFromLookerWorkshop();
    await populateUsers(users);
  } catch (error) {
    console.error(error, "error");
  }
};

init();
