const schedule = require("node-schedule");
const ChatServices = require("../services/ChatServices");
const ChatServicesInstance = new ChatServices();

schedule.scheduleJob("00 00 */12 * * *", async () => {
  console.log("Start deleting chats");
  const chats = await ChatServicesInstance.getDeletedChats();
  if (!chats) return;

  chats.map(async ({ chatId }) => {
    await ChatServicesInstance.deleteChatFromDB(chatId);
  });
});
