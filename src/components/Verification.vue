<template>
  <div class="verification">
    <v-col cols="2">
      <v-row>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            label="Почта"
            type="email"
            placeholder="example@gmail.com"
            outlined
            required
            :rules="[rules.required, rules.email]"
            @input="SET_EMAIL"
          />
          <v-btn
            text
            :disabled="!valid"
            @click="validate"
          >
            Отправить
          </v-btn>
        </v-form>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Verification',
  data() {
    return {
      valid: true,
      rules: {
        required: value => !!value || 'Обязательное поле.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        },
      },
    };
  },
  computed: {
    ...mapState(['dataRent']),
  },
  methods: {
    ...mapMutations(['SET_EMAIL']),
    validate () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('sendDataRent');
      }
    },
  },
};
</script>
