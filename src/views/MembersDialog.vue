<template>
     <add-member-dialog :show-add-member-dialog="addMemberDialog" @update:show-add-member-dialog="addMemberDialog = $event;getMembers();" />
    <v-dialog v-model="dialogVisible" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">الاعضاء</v-card-title>
        <v-btn fab bottom right color="primary" class="add-member-btn" @click="showAddMemberDialog">
      <v-icon>mdi-plus</v-icon>دعوة عضو
    </v-btn>
        <v-card-text>
          <v-list>
            <v-list-item-subtitle class="message-sender text-center">الاعضاء</v-list-item-subtitle>
            <v-list-item v-for="(member, index) in members" :key="index">
              <v-row>
                <v-col cols="auto">
                  <v-list-item-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-avatar>
                </v-col>
                <v-col>
                  <v-list-item-content>
                <v-list-item-title>{{ member.username }}</v-list-item-title>
              </v-list-item-content>
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item-subtitle class="message-sender text-center">المستخدمين الذين تم دعوتهم</v-list-item-subtitle>
            <v-list-item v-for="(member, index) in invitedUsers" :key="index">
              <v-row>
                <v-col cols="auto">
                  <v-list-item-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-avatar>
                </v-col>
                <v-col>
                  <v-list-item-content>
                <v-list-item-title>{{ member.username }}</v-list-item-title>
              </v-list-item-content>
                </v-col>
              </v-row>
            </v-list-item>            
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
<script>
import AddMemberDialog from './AddMemberDialog.vue';
import api from '../plugins/api'
export default{
components:{
    AddMemberDialog
},
props:{
    showMembersDialog: {
        type: Boolean,
        required: true,
      },
},
data:()=>({
    dialogVisible: false,
    addMemberDialog: false,
    members: [],
    invitedUsers:[],
}),
mounted(){
  this.getMembers();
},
methods:{
    showAddMemberDialog() {
      this.addMemberDialog = true;
      console.log("showAddMemberDialog");
    },
    getMembers(){
      api.get(`/RoomMemberships/get?roomId=${this.$route.query.id}&accepted=${true}`)
      .then(response => {
        this.members= response.data;
      });
      api.get(`/RoomMemberships/get?roomId=${this.$route.query.id}&accepted=${false}`)
      .then(response => {
        this.invitedUsers= response.data;
      });
    }
},
watch:{
    showMembersDialog(newValue) {
        this.dialogVisible = newValue;
      },
    dialogVisible(newValue) {

        if (newValue !== this.showMembersDialog) {
          this.$emit('update:showMembersDialog', newValue); 
        }
      },
}
}
</script>