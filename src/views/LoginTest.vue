<template>
  <div class="main-login">
    <div class="login">
      <div class="login-access">
        <div class="card-login">
          <div class="card-login-frame">
            <span class="text-login">Sign in to your account</span>
            <div class="input">
              <div class="form-group">
                <!-- <span>username</span> -->
              <input 
                type="email"
                placeholder="USERNAME"
                v-model="login_access.username"
                class="text-input-username"
              />
            </div>
              <input
                placeholder="PASSWORD "
                :type="showPassword ? 'text' : 'password'"
                v-model="login_access.password"
                class="text-input-password"
              />
              <span v-if="login_access.username.length >= 0 && login_access.password.length <= 7" class="validation_password">
                กรุณาใส่ password อย่างน้อย 8 ตัว
              </span>
            </div>
            <div class="login-remember">
              <input
                v-model="showPassword"
                class="login-checkbox"
                type="checkbox"
              /><span class="login-text-remember" >Remember me?</span>
            </div>
            <div>
              <button @click="login()" class="btn-login">
                <span class="text-btn-login">Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import books from "../router/helpers/service/books";
import { loginComputed, loginMethods } from "../state/helpers";
export default {
  data() {
    return {
      password: "",
      showPassword: false,
      login_access: {
        username: "",
        password: "",
      },
      items: [],
    };
  },
  created() {
    // this.login_access = Object.assign({}, this.GET_FILTER_LOGIN);
  },
  mounted() {
    // this.getBooks();
  },
  computed: {
    ...loginComputed,
  },
  methods: {
    ...loginMethods,

    // async getBooks() {
    //   await books
    //     .getBooksProvider()
    //     .then((items) => {
    //       this.items = items.data;
    //     })
    //     .catch((error) => {});
    // },

    valiDate() {},
    async login() {
      if (this.login_access.username === "") {
        this.$utils.notificationConfirm("warning", "กรุณาใส่ USERNAME", 0);
      } else if (this.login_access.password === "") {
        this.$utils.notificationConfirm("warning", "กรุณาใส่ PASSWORD", 0);
      } else if (
        this.login_access.username !== "" &&
        this.login_access.password.length <= 7
      ){
        this.$utils.notificationConfirm( 
          "warning",
          "กรุณาใส่ password อย่างน้อย 8 ตัว",
          0
        );
      } else if (
        this.login_access.username !== "" &&
        this.login_access.password !== "" 
        //ตรวจสอบการเข้ารหัสมากกว่า 8 ตัว
      ) {
        await books
          .getBooksIDProvider(this.login_access)
          .then((item) => {
            this.$utils.notificationConfirm("success", "เข้าสู่ระบบเรียบร้อยแล้ว", 0);
            setTimeout(() => {
              window.location = "/importcsv";
            }, 1500);
            this.ADD_FILTER_LOGIN(this.login_access);
          })
          .catch((error) => {
            this.$utils.notificationConfirm("warning", "เสียใจด้วย", 0);
          });
      }
    },
  },
};
</script>
<style>

.validation_password{
  color: #e75454;
  font-size: small;
}

.image-login-ofm-main {
  margin-top: 40px;
}

.btn-login2:hover {
  transform: scale(1.1);
  animation: alternate;
  color: #ffff;
  border: none;
}

.btn-login2 {
  transition: 0.35s;
  margin-top: 40px;
  height: 40px;
  background: #ffff;
  border-radius: 3px;
  width: 100%;
  padding: 5px;
  color: #0675bd;
  font-weight: 800;
  border: 2px solid #0675bd;
  border-radius: 10px;
}

.btn-login2:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.btn-login2:active {
  color: #000;
}

.btn-login2:active:after {
  background: transparent;
}

.btn-login2:hover:before {
  opacity: 1;
}

.btn-login2:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #0675bd;

  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.image-login-ofm {
  margin-top: -100px;
}

.next-sign-up-text2 {
  top: -6px;
  position: relative;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  margin-left: 30px;
  color: #0675bd;
}

#arrow_forward_ios {
  margin-left: 5px;
  font-size: 20px;
  color: #0675bd;
}

.next-sign-up-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
}

.next-login-up {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.next-sign-up {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.btn-platform-text-login {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;

  color: #000000;
}

.input-platform {
  margin-top: 40px;
  text-align: center;
}

.image-facebook-login {
  width: 60px;
  padding: 10px;
}

.btn-facebook-login {
  background: #ffffff;
  border: 0.621212px solid #cfd8dc;
  border-radius: 2.48485px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 4px;
}

.btn-platform-login {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.text-btn-login {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}

.btn-login {
  margin-top: 40px;
  /* height: 40px; */
  border-radius: 6px;
  border: none;
  padding: 10px 24px;
  background-color: #555555;
  width: 100%;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.btn-login:hover{
  background-color: #4CAF50; /* Green */
  color: white;
}

.login-text-forgot {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 14px;
  color: #424242;
  margin-left: auto;
  margin-top: 2.5px;
  color: #0675bd;
}

.login-text-remember {
  margin-top: 2px;
  margin-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  color: #424242;
}

.login-checkbox {
  width: 18px;
  height: 18px;

  background: #ffffff;
  border: 1px solid #cfd8dc;
}

.login-remember {
  margin-top: 20px;
  display: flex;
}

.text-input-password {
  height: 50px;
  margin-top: 10px;
  background: #e4e9ea;
  border: none;
  /* border: 1px solid #cfd8dc; */
  border-radius: 6px;
  width: 100%;
  padding: 10px;
}

.text-input-first {
  padding: 10px;
  height: 50px;
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #cfd8dc;
  /* border-radius: 10px; */
  width: 100%;
  margin-right: 20px;
}

.input {
  display: block;
}

.text-input-username {
  padding: 8px 16px;
  height: 50px;
  margin-top: 20px;
  border: none;
  background: #e4e9ea;
  /* border: 1px solid #cfd8dc; */
  border-radius: 6px;
  width: 100%;
}

.text-login {
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 23px;

  color: #424242;
}

.card-login-frame {
  padding: 40px;
}

.login-access {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card-login {
  width: 478px;
  height: 382px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.login {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;

  background: linear-gradient(180deg, #eceff1 0%, #ffffff 100%);
}

.main-login {
  width: 100%;
  height: 100vh;
}

/* test */

</style>
