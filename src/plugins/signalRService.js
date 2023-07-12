import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:7056/messagehub')
  .build();

connection.on('ReceiveMessage', (user, message) => {
  // Handle received message
});

export function startSignalRConnection() {
  return connection.start()
    .then(() => {
      console.log('SignalR connection established.');
    })
    .catch(error => {
      console.error('Error establishing SignalR connection:', error);
    });
}

export default connection;
