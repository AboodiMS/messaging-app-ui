<template>
    <v-app-bar prominent>
      <v-toolbar-title class="text-center" >انشاء غرفة دردشة</v-toolbar-title>
    </v-app-bar>
    <v-sheet  class="mx-auto">
      <v-form fast-fail ref="Form" @submit.prevent="createRoom">
        <v-text-field
          v-model="formData.name"
          :label="formLabels.name"
          :rules="formDataRules.name"
        ></v-text-field>
        <v-btn          
        type="submit"
        :disabled="!$refs.Form || !$refs.Form.validate()" >
        اضافة</v-btn>
        <v-btn @click="goBack" >رجوع</v-btn>
      </v-form>
    </v-sheet>
  </template>
  <script>
  import api from '../plugins/api';
    export default {
      methods : {
        goBack(){
          this.$router.go(-1)
        },
       async createRoom(){
          const validation = await this.$refs.Form.validate();
        if (validation.valid) {
         api.post('/rooms/create', this.formData)
            .then(response => {
              console.log(response.data);
              this.$router.push({ path: '/messages', query: { id: response.data } });
            })
        }
        },
      },
      data: () => ({
        formData:{
          name:'',
        },
        formDataRules:{
          name:[
               v => !!v || 'هذا الحقل مطلوب.',,
          ],
        },
        formLabels:{
          name:'الاسم',
        },
      }),
    }
  </script>