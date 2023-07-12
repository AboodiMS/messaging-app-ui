<template>
  <div>
    <v-app-bar prominent>
      <v-toolbar-title class="text-center">تسجيل الدخول</v-toolbar-title>
    </v-app-bar>

    <v-form ref="loginForm" @submit.prevent="login">
      <v-card class="mx-auto pa-12 pb-8 mt-12" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">{{ formLabels.username }}</div>

        <v-text-field
          density="compact"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-model="formData.username"
          :placeholder="formLabels.username"
          :rules="formDataRules.username"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          {{ formLabels.password }}
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          v-model="formData.password"
          :placeholder="formLabels.password"
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
          :disabled="!$refs.loginForm || !$refs.loginForm.validate()"
        >
          تسجيل الدخول
        </v-btn>

        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="/register">
            سجل الان <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import api from '../plugins/api';

export default {
  data: () => ({
    visible: false,
    formData: {
      username: '',
      password: '',
    },
    formLabels: {
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
    },
    formDataRules: {
      username: [
        v => !!v || 'هذا الحقل مطلوب.',
      ],
      password: [
        v => !!v || 'هذا الحقل مطلوب.',
      ],
    },
  }),
  methods: {
    async login() {
      const validation = await this.$refs.loginForm.validate();
        if (validation.valid) {
         api.post('/accounts/login', this.formData)
            .then(response => {
              localStorage.setItem('token', response.data); 
              this.$router.push('/rooms');
            })
        }
      },
  },
};
</script>
