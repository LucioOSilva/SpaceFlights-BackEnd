const connection = require('./connection');

let connectionInstance = { newConnection: null, startTime: 0 };

const setNewConnection = async () => {
  const startTime = new Date() - 0;
  const newConnection = await connection();
  return { startTime, newConnection };
};

const connectionHandler = async () => {
  const connectionTimerHafAnHourMS = 900000;
  const timeElapsedOlderInstance = connectionInstance.startTime + connectionTimerHafAnHourMS;
  const startTimeNewInstance = new Date() - 0;

  if (startTimeNewInstance < timeElapsedOlderInstance) {
    return connectionInstance.newConnection;
  }

  if (connectionInstance.newConnection) {
    await connectionInstance.newConnection.close();
  }
  const newConnection = await setNewConnection();
  connectionInstance = newConnection;
  return newConnection.newConnection;
};

module.exports = connectionHandler;
