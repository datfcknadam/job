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
          <v-text-field
            type="phone"
            v-mask="'+# (###) ###-##-##'"
            label="Номер телефона"
            placeholder="+79159990999"
            outlined
            required
            :rules="[rules.required]"
            @input="SET_PHONE"
          />
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
import { mask } from 'vue-the-mask';
import { mapMutations, mapState } from 'vuex';
import sha1 from 'js-sha1';

export default {
  name: 'Verification',
  directives: {mask},
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
      inputCode: '',
    };
  },
  computed: {
    ...mapState(['dataRent', 'chooseShip', 'ships', 'status', 'code']),
  },
  methods: {
    ...mapMutations([
      'SET_EMAIL',
      'SET_SHIP',
      'SET_STATUS',
      'SET_PHONE',
      'SET_SHIP_ID',
      'SET_SHIP_NAME',
    ]),
    validate () {
      if (this.$refs.form.validate()) {
        this.SET_SHIP_ID(this.ships[this.chooseShip]._id);
        this.SET_SHIP_NAME(this.ships[this.chooseShip].name)
        this.$store.dispatch('verificationRent');
        this.SET_STATUS(300);
      }
    },
    validateCode() {
      const intCode = parseInt(this.inputCode, 10);
      const shaCode = sha1(intCode);

      if (this.code ===  shaCode) {
        this.error = false;
        this.$store.dispatch('sendDataRent');
      } else {
        this.error = true;
      }
    },
  },
};
</script>
