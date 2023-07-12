<template>
    <v-dialog v-model="dialogVisible" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">الدعوات الى غرف الدردشة</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(invitation, index) in invitations" :key="index">
              <v-row :align = "center">
                <v-col cols="auto">
                  <v-icon class="mr-2">mdi-message</v-icon>
                </v-col>
                <v-col>
                  <v-list-item-title class="message-sender">{{ invitation.roomName }}</v-list-item-title>
                </v-col>
                <v-col cols="auto">
                  <v-btn icon type="button" @click="accepte(invitation.id)" color="primary"><v-icon>mdi-check</v-icon></v-btn>
                  <v-btn icon type="button" @click="delete1(invitation.id)" color="error"><v-icon>mdi-delete</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import api from '@/plugins/api';
  import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
  export default {
    props: {
      showInvitationsDialog: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        invitations: [],
        dialogVisible: false,
      };
    },
    mounted(){
      this.getInvetations();
    },
    methods:{
      accepte(id){
        console.log("accepte");
        api.post(`/RoomMemberships/Accepte?id=${id}`)
        .then(response => {
          const index = this.invitations.findIndex(item => item.id === id);
          if (index !== -1) {
            this.invitations.splice(index, 1);
          }
          toast.success("تم قبول الدعوة", { duration: 5000 });
        });
      },
      delete1(id){
        api.delete(`/RoomMemberships/Delete?id=${id}`,{id})
        .then(response => {
          const index = this.invitations.findIndex(item => item.id === id);
          if (index !== -1) {
            this.invitations.splice(index, 1);
          }
          toast.success("تم حذف الدعوة", { duration: 5000 });
        });
      },
      getInvetations(){
        api.get(`/RoomMemberships/GetUsersInvitations`)
        .then(response => {
          this.invitations= response.data;
        });
      },
    },
    watch: {
      showInvitationsDialog(newValue) {
        if(newValue){
          this.getInvetations();
        }
        this.dialogVisible = newValue;
      },
      dialogVisible(newValue) {
        if (newValue !== this.showInvitationsDialog) {
          this.$emit('update:showInvitationsDialog', newValue);
        }
      },
    },
  };
  </script>
  