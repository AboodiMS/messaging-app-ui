import * as signalR from '@microsoft/signalr';

const token = localStorage.getItem('token');
const encodedToken = encodeURIComponent(token.substring(7));
const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://localhost:7056/messagehub?access_token=${encodedToken}`)
  .build();
connection.on('ReceiveMessage', (dto) => {});

export function startSignalRConnection() {
  return connection.start().then(() => { console.log('SignalR connection established.'); })
                           .catch(error => { console.error('Error establishing SignalR connection:', error); });
}
export default connection;
