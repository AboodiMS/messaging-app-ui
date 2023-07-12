<template>
    <div>
      <v-app-bar prominent>
      <v-toolbar-title class="text-center" >انشاء حساب</v-toolbar-title>
    </v-app-bar>
      <v-card
        class="mx-auto pa-12 pb-8 mt-12"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
      <v-form fast-fail ref="Form" @submit.prevent="register">
        <div class="text-subtitle-1 text-medium-emphasis">{{ formLabels.username }}</div>
  
  <v-text-field
    density="compact"
    :placeholder="formLabels.username"
    v-model="formData.username"
    :rules="formDataRules.username"
    prepend-inner-icon="mdi-account"
    variant="outlined"
  ></v-text-field>

  <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
    {{formLabels.password}}
  </div>

  <v-text-field
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    density="compact"
    :placeholder="formLabels.password"
    v-model="formData.password"
    :rules="formDataRules.password"
    prepend-inner-icon="mdi-lock-outline"
    variant="outlined"
    @click:append-inner="visible = !visible"
  ></v-text-field>

  <v-btn
    block
    class="mb-8"
    color="blue"
    size="large"
    variant="tonal"
    type="submit"
  :disabled="!$refs.Form || !$refs.Form.validate()"
  >
    تسجيل
  </v-btn>
      </v-form>

  
        <v-card-text class="text-center">
          <router-link
          class="text-blue text-decoration-none"
         to="/login"
          >
            تسجيل الدخول<v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </div>
  </template>
  <script>
    import api from '../plugins/api';
    export default {
      data: () => ({
        visible: false,
        formData:{
          username:'',
          password:'',
        },
        formDataRules:{
          username:[
               v => !!v || 'هذا الحقل مطلوب.',
          ],
          password:[
               v => !!v || 'هذا الحقل مطلوب.',
          ],
        },
        formLabels:{
          username:'اسم المستخدم',
          password:'كلمة المرور',
        },
      }),
      methods:{
       async register(){
          const validation = await this.$refs.Form.validate();
        if (validation.valid) {
         api.post('/accounts/register', this.formData)
            .then(response => {
              localStorage.setItem('token', response.data); 
              this.$router.push('/rooms');
            });
        }
        }
      }
    }
  </script>