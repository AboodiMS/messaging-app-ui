<template>
  <v-container fluid class="full-height">
    <v-app-bar prominent>
      <v-toolbar-title >{{ room.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showMembersDialog">
          <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

    </v-app-bar>
    <members-dialog :show-members-dialog="membersDialog" @update:show-members-dialog="membersDialog = $event" />
    <v-row class="full-height">
      <v-col cols="12">
        <v-card class="chat-container full-height" ref="listContainer" >
          <v-card-text class="chat-messages" id="myCard"  @scroll="onScroll">
            <v-list >
              <v-list-item
                v-for="(message, index) in roomMessages"
                :key="index"
                class="custom-chat-item my-2"
              >
                <v-list-item-content>
                  <v-row :align="center">
                    <v-col>
                      <v-list-item-subtitle class="message-sender">{{ message.username }}</v-list-item-subtitle>
                      <v-list-item-title class="message-content">{{ message.text }}</v-list-item-title>                     
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-text-field
              v-model="newMessage"
              outlined
              label="اكتب رسالة"
              solo
              @keyup.enter="sendMessage"
            ></v-text-field>
            <v-btn @click="sendMessage" color="primary">ارسال</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import connection, { startSignalRConnection } from '../plugins/signalRService';
import api from '../plugins/api';
import MembersDialog from './MembersDialog.vue';
import AddMemberDialog from './AddMemberDialog.vue';
export default {
  components:{
    MembersDialog,
    AddMemberDialog
  },
  data() {
    return {
      user: {username:null,id:null},
      room: { name:null , id:null },
      roomMessages: [],
      newMessage: '',
      membersDialog: false,
      allOldMessagesObtained:false,
      Skip:0,
      Take:5,
      members:[]
    };
  },
  async  created() {
     await this.getRoom();
     await this.getUser();
     await this.getMembers();
     await this.getOldMessages();
     await this.getOldMessages();
     this.scrollingDown();
     startSignalRConnection();
      connection.on('ReceiveMessage', (dto) => {
        console.log(this.room);
        console.log(dto);
        if(this.room.id===dto.roomId){
        const member = this.members.find(member => member.userId === dto.createdBy);
        const username = member ? (member.username === this.user.username ? 'انت' : member.username) : '';        
        this.roomMessages.push({
        id: dto.id,
        username: username,
        text: dto.text,
        createdBy: dto.createdBy,
        createdAt: dto.createdAt
      });
      this.Skip++;
      this.scrollingDown();
        }

    });
  },
   mounted() {

  },
  methods: {
    onScroll(){
      let Div = document.getElementById('myCard');
     if(Div.scrollTop<10){
      this.getOldMessages();
     } 
    },
    getUser(){
      api.get('/accounts/get')
                    .then(response => {
                      console.log(response.data);
                      this.user = response.data;
                    });
    },
    async scrollingDown(){
      await new Promise(r => setTimeout(r, 1)); 
      let div = document.getElementById('myCard');
      div.scrollTop += div.scrollHeight;
    },
   async getRoom(){
                    await api.get('/rooms?id='+this.$route.query.id)
                    .then(response => {
                      this.room = response.data;
                      console.log(response.data);
                    });
    },
    async getMembers(){
              await  api.get(`/RoomMemberships/Get?roomId=${this.$route.query.id}`)
                .then(response => {
                  console.log(response.data);
                  this.members= response.data;
                });
    },
    addRangRoomMessages(newlist){
      const newListWithUsername = newlist.map(row => {
      const member = this.members.find(member => member.userId === row.createdBy);
      const username = member ? (member.username === this.user.username ? 'انت' : member.username) : '';

      return {
        id: row.id,
        username: username,
        text: row.text,
        createdBy: row.createdBy,
        createdAt: row.createdAt
      };
    });
    return  newListWithUsername.concat(this.roomMessages);
          // .sort((a, b) => b.createdAt - a.createdAt);
    },
   async getOldMessages(){
      if(!this.allOldMessagesObtained){
          await  api.get(`/messages/Get?roomId=${this.$route.query.id}&Skip=${this.Skip}&Take=${this.Take}`)
                .then(response => {
                  this.allOldMessagesObtained = response.data.length < this.Take;
                  if(response.data.length > 0){
                    this.roomMessages = this.addRangRoomMessages(response.data);
                    this.Skip=this.Skip+this.Take;
                  }
         });
      }   
    },
    showMembersDialog(){
      this.membersDialog = true;
    },
    goBack() {
      this.$router.go(-1)
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        api.post(`/messages/Create`,{roomId:this.$route.query.id,text:this.newMessage.trim()})
                .then(response => {
                  this.newMessage='';
                });
      }
    },
  },
};
</script>

<style>
.full-height {
  height: 80vh;
 
}

.full-width {
  width: 100vw;
}

.chat-container {
  margin: 0 auto;
}

.chat-header {
  background-color: #f5f5f5;
  padding: 10px;
}

.chat-messages {
  height: calc(100% - 80px);
  overflow-y: auto;
}

.custom-chat-item {
  background-color: #cdcbd1;
  color: #182236;
}
.message-content {
  white-space: pre-wrap;
}
</style>
