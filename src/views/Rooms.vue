<template>
  <div class="chat-room-list-container">
    <v-app-bar prominent>
      <v-toolbar-title class="text-center" >غرف الدردشة</v-toolbar-title>
    </v-app-bar>

    <v-list class="chat-room-list">
      <v-list-item
        v-for="(room, index) in chatRooms"
        :key="index"
        link
        @click="handleRoomClick(room)"
      >
      <v-row>
        <v-col cols="auto">
          <v-list-item-icon>
          <v-icon>mdi-message</v-icon>
        </v-list-item-icon>
        </v-col>
        <v-col>
          <v-list-item-content>
          <v-list-item-title class="room-name">{{ room.name }}</v-list-item-title>
        </v-list-item-content>
        </v-col>
      </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>
  
  <script>
  import api from '../plugins/api';
  export default {
    data() {
      return {
        chatRooms: [
        ]
      };
    },
    methods: {
    handleRoomClick(room) {
      this.$router.push({ path: '/messages', query: { id: room.id } });
    },
    loudingRooms(){
      api.get('/rooms/get')
            .then(response => {
              this.chatRooms=response.data;
            })
    },
  },mounted() {
    this.loudingRooms();
  }
  };
  </script>
  
  <style>
  .room-name {
    font-weight: bold;
  }
  
  .unread-count {
    color: red;
  }
  </style>
  
  <style>
.chat-room-list-container {
  height: 80vh; 
  overflow-y: auto; 
}

.chat-room-list {
  padding: 0;
}
</style>