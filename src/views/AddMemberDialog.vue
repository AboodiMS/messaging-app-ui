<template>
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">دعوة عضو</v-card-title>
      <v-card-text>
        <v-form ref="addMemberForm" >
          <v-autocomplete 
            label="اسم المستخدم"
            :items="users"
            item-title="username"
            item-value="id"
            v-model="newMember"
          ></v-autocomplete>
          <v-btn type="button" @click="addMember" color="primary">دعوة</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '../plugins/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  props: {
    showAddMemberDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      users:[],
      newMember:'',
      dialogVisible: false,
    };
  },
  mounted(){
     
  },
  methods: {
    SearchUsersForInvetation(){
      api.get(`/Users/SearchUsersForInvetation?roomId=${this.$route.query.id}`)
      .then(response => {
        this.users = response.data;
      });
    },
    addMember() {
      api.post(`/RoomMemberships/Invitation`,
      {
        roomId:this.$route.query.id,
        userId:this.newMember,
      })
      .then(response => {
        toast.success("تم ارسال الدعوة", { duration: 5000 });
        const index = this.users.findIndex(item => item.id === this.newMember);
      if (index !== -1) {
        this.users.splice(index, 1);
        this.newMember=''
      }
      });
    },
    closeDialog() {
      this.$emit('update:show-add-member-dialog', false); 
    },
  },
  watch: {
    showAddMemberDialog(newValue) {
      if(newValue)
        { 
         this.SearchUsersForInvetation();
        }
      this.dialogVisible = newValue;
    },
    dialogVisible(newValue) {
      if (newValue !== this.showAddMemberDialog) {
        this.$emit('update:show-add-member-dialog', newValue);
      }
    },
  },
};
</script>
