<template>
  <div class="verification">
    <v-col cols="auto">
      <v-row>
        <v-form
          v-show="status !== 200 ? true : false"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <!--     <v-text-field
            label="Фамилия"
            placeholder="Иванов"
            outlined
            required
            :rules="[rules.required]"
          />
          <v-text-field
            label="Имя"
            placeholder="Иван"
            outlined
            required
            :rules="[rules.required, rules.email]"
            @input="SET_EMAIL"
          /> -->

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
            :loading="status === 300 ? true : false"
            @click="validate()"
          >
            Отправить
          </v-btn>
        </v-form>
        <v-form v-show="status === 200 ? true : false">
          <v-row>
            <v-text-field
              v-model="inputCode"
              class="verification-field"
              label="Код"
              :hint="hintField"
              placeholder="Введите код из сообщения на почте"
              outlined
              required
              :rules="[rules.required]"
            />
            <span
              v-show="error"
              v-text="'Неправильный код'"
            />
          </v-row>
          <v-btn
            text
            :disabled="!valid"
            :loading="status === 300 ? true : false"
            @click="validateCode"
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
      error: false,
      inputCode: 0,
    };
  },
  computed: {
    ...mapState(['dataRent', 'chooseShip', 'ships', 'status', 'code']),
  },
  methods: {
    ...mapMutations(['SET_EMAIL', 'SET_SHIP', 'SET_STATUS']),
    validate () {
      if (this.$refs.form.validate()) {
        this.SET_SHIP(this.ships[this.chooseShip].name);
        this.$store.dispatch('verificationRent');
        this.SET_STATUS(300);
      }
    },
    validateCode() {
      if (this.code === parseInt(this.inputCode, 10)) {
        this.error = false;
        this.$store.dispatch('sendDataRent');
        console.log('ok');
      } else {
        this.error = true;
      }
    },
  },
};
</script>
