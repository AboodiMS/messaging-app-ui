<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click="openCloseDrawer" ></v-app-bar-nav-icon>

        <v-toolbar-title>{{ $t("AppName") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="showInvitationsDialog">
          <v-icon>mdi-email</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="bottom"
        temporary
      >
        <v-list density="compact" nav>
          <v-list-item   @click="addNewRoom()">
            <v-row>
            <v-col cols="auto">
                <v-icon>mdi-message</v-icon>
              </v-col>
              <v-col>
                <v-list-item-title class="ma-2 font-weight-bold">انشاء غرفة دردشة</v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item  @click="logout">
            <v-row>
            <v-col cols="auto">
                <v-icon>mdi-logout</v-icon>
              </v-col>
              <v-col>
                <v-list-item-title class="ma-2 font-weight-bold">تسجيل الخروج</v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <invitations-dialog :show-invitations-dialog="invitationsDialogD" @update:show-invitations-dialog="invitationsDialogD = $event" />

      <v-main style="height: 100vh;">
        <v-card-text>
          <View />
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import View from './View.vue'
import InvitationsDialog from './InvitationsDialog.vue';
export default {
  components: {
    View,
    InvitationsDialog
  },
  data() {
    return {
      invitationsDialogD: false,
      drawer: false,
      selectedItem: 0,
      group: null,
      items: [
        { title: 'انشاء غرفة دردشة', router: '/addroom', icon: 'mdi-message' },
        { title: 'تسجيل الخروج', router: '/login', icon: 'mdi-logout' },
      ],
    };
  },
  methods: {
    openCloseDrawer(){
      if(localStorage.getItem('token')!==null)
           this.drawer=!this.drawer;
    },
    showInvitationsDialog() {
      if(localStorage.getItem('token')!==null)
          this.invitationsDialogD = true;
    },
    addNewRoom(){
      this.drawer = false;
      this.$router.push("/addroom");
    },
    logout(){
      this.drawer = false;     
      localStorage.removeItem('token');
      this.isLogin=localStorage.getItem('token')!==null;
      this.$router.push("/login");
    },
    selectProjectSectionItem(index, router) {
      this.selectedItem = index;
      this.drawer = false;
      this.$router.push(router);
    },
  }
}
</script>
