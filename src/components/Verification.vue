<template>
  <div class="verification">
    <v-col cols="2">
      <v-row>
        <v-text-field
          label="Почта"
          type="email"
          placeholder="example@gmail.com"
          outlined
          :rules="[rules.required, rules.email]"
        />
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'Verification',
  data() {
    return {
      rules: {
        required: value => !!value || 'Обязательное поле.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        },
      },
    };
  },
};
</script>
