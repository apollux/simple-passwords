 <template>
  <div class="columns">
    <div class="column">
      <div class="form-group">
        <h2>Register</h2>
        <label class="form-label" for="register-email">Email</label>
        <input class="form-input" type="email" id="register-email" placeholder="Email" v-model="registerEmail">
        <label class="form-label" for="register-password">Password</label>
        <span class="text-gray">
          <p>This password protects all your other passwords, so make sure it is strong! Some suggestions:</p>
          <ul>
            <li v-for="suggestion in suggestions">{{ suggestion }}</li>
          </ul>
        </span>
        <input type="password" class="form-input" id="register-password" placeholder="Password" v-model="registerPassword">
        <label class="form-label" for="register-password-verify">Repeat password</label>
        <input type="password" class="form-input" id="register-password" placeholder="Repeat password" v-model="registerPasswordVerify">
      </div>
      <div class="form-group">
        <LoadingButton
          class="btn-primary"
          :content="'Register'"
          :action="register" />
      </div>
    </div>
    <div class="divider-vert" data-content="OR"></div>
    <div class="column">
      <div class="form-group">
        <h2>Login</h2>
        <label class="form-label" for="login-email">Email</label>
        <input class="form-input" type="email" id="login-email" placeholder="Email" v-model="loginEmail">
        <label class="form-label" for="login-password">Password</label>
        <input type="password" class="form-input" id="login-password" placeholder="Password" v-model="loginPassword">
      </div>
      <div class="form-group">
        <LoadingButton
          class="btn-primary"
          :content="'Login'"
          :action="login" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash/fp';
import generatePassword from '../domain/generate-password';
import LoadingButton from './LoadingButton';
export default {
  name: 'LoginOrRegister',
  components: { LoadingButton },
  data() {
    return {
      registerEmail: '',
      registerPassword: '',
      registerPasswordVerify: '',
      loginEmail: '',
      loginPassword: '',
      suggestions: _.map(generatePassword)(_.range(0, 3))
    };
  },
  methods: {
    async login() {
      await this.standardfileClient.signIn(this.loginEmail, this.loginPassword);
      this.loading = false;
      this.onLoggedIn();
    },
    async register() {
      await this.standardfileClient.register(
        this.registerEmail,
        this.registerPassword
      );
      this.onLoggedIn();
    },
    onLoggedIn() {
      this.standardfileClient.sync();
      this.$emit('loggedIn');
    }
  },
  dependencies: ['standardfileClient']
};
</script>