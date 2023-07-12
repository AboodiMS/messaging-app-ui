<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.user }} says: {{ message.text }}
      </li>
    </ul>
    <input v-model="user" placeholder="User" />
    <input v-model="message" placeholder="Message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import * as signalR from '@microsoft/signalr';

export default {
  data() {
    return {
      user: '',
      message: '',
      messages: []
    };
  },
  created() {
    // Initialize SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7056/messagehub') // Update with the correct URL
      .build();
    connection.on('ReceiveMessage', (dto) => {
      this.messages.push(dto);
    });

    // Start SignalR connection
    connection.start().then(() => {
      console.log('SignalR connection established.');
    });
  },
  methods: {
    sendMessage() {
      // Send message using SignalR
      const dto = {
        user: this.user,
        text: this.message
      };
      this.$signalR.connection.invoke('ReceiveMessage', dto);
      this.user = '';
      this.message = '';
    }
  }
};
</script>
