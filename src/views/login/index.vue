<template>
  <div class="login-container">
    <div class="layer">
      <div class="some-space">
        <img src="../../assets/img/logo@2x.png" alt="" class="logo">
        <div class="form">

          <h2>隧道智能巡检系统</h2>

          <el-form :inline-message="true" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
            label-width="0rem" class="demo-ruleForm">
            <el-form-item prop="username">
              <div class="item">
                <i class="el-icon-user-solid"></i>
                <el-input type="text" class="input" v-model.trim="loginForm.username" auto-complete="off" placeholder="账号"
                  clearable>
                </el-input>
              </div>
            </el-form-item>

            <el-form-item prop="password">
              <div class="item">
                <i class="el-icon-lock"></i>
                <el-input type="password" v-model.trim="loginForm.password" auto-complete="off" placeholder="密码"
                  clearable>
                </el-input>
              </div>
            </el-form-item>
            <el-checkbox class="remember" v-model="checked">记住密码</el-checkbox>

            <el-form-item style="width: 100%;margin-top:1.25rem">
              <el-button type="primary" class="loginBtn" @click.native.prevent="handleLogin" :loading="loading">{{
                $t('login.login') }}</el-button>
            </el-form-item>
            <!-- <div class="tip">默认用户名：jiaqi ，默认密码：JQ2022</div> -->
          </el-form>
        </div>

      </div>
      <div class="copyright">
        <div>Copyright@广州市佳启智能科技有限责任公司</div>
      </div>
    </div>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';
import { getSystemXmlConfig } from '../../api/sysCtrl';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'change', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'change', validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: true,
    };
  },
  created() {
    document.onkeydown = (e) => {
      e = window.event || e;
      if (
        (this.$route.path === '/login' || this.$route.path === '/') &&
        (e.code === 'Enter' || e.code === 'enter')
      ) {
        this.handleLogin();
      }
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    this.loginForm.username = localStorage.getItem('username')
    this.loginForm.password = localStorage.getItem('password')
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      //cgw
      // this.$router.push({ path: this.redirect || "/" });
      // return;
      //cgw
      if (this.checked) {
        localStorage.setItem('username', this.loginForm.username)
        localStorage.setItem('password', this.loginForm.password)
      }
      else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
      }
      let self = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let loginInfo = {
            userName: self.loginForm.username,
            passWord: self.loginForm.password,
          };
          this.$store
            .dispatch('user/login', loginInfo)
            .then(async () => {
              this.$router.push({ path: this.redirect || '/' });
              this.loading = false;
              const res = await getSystemXmlConfig();
              if (res.code === 20000 && res.data) {
                // console.log('查看res',res.data)
                this.$store.dispatch('sysConfig/setSystemConfig', res.data);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  .layer {
    position: absolute;
    height: 100%;
    width: 100%;
    // min-height: 41.875rem;
    // min-width: 80rem;
    background-image: url('../../assets/img/loginBackground.png');
    background-size: 120rem 60.5rem;
  }

  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .some-space {
    color: white;
    font-weight: 100;
    letter-spacing: .125rem;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1001;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);

    // -ms-animation: cloud 2s 3s ease-in infinite alternate;
    // -moz-animation: cloud 2s 3s ease-in infinite alternate;
    // -webkit-animation: cloud 2s 3s ease-in infinite alternate;
    // -o-animation: cloud 2s 3s ease-in infinite alternate;
    // -webkit-animation: cloud 2s 3s ease-in infinite alternate;
    // animation: cloud 2s 3s ease-in infinite alternate;
    .logo {
      width: 17.5rem;
      height: 3.5rem;
      margin-left: 5.625rem;
      margin-bottom: 2.5rem;
    }

    .form {
      width: 31.25rem;
      height: auto;
      background: rgba($color: #5F829F, $alpha: 0.5);
      margin: 0 auto;
      padding: 2.1875rem 1.875rem 1.5625rem;
      box-shadow: 0 0 1.5625rem rgba(22, 43, 102, 0.5);
      border-radius: .625rem;

      .item {
        display: flex;
        align-items: center;

        // margin-bottom: 1.5625rem;
        i {
          color: #d3d7f7;
          margin-right: .625rem;
          font-size: 1.5rem;
        }
      }

      h2 {
        text-align: center;
        font-weight: normal;
        font-size: 3rem;
        color: #d3d7f7;
        font-weight: bold;
        opacity: 1;
        padding-bottom: 1rem;
      }

      //   .input {
      //     font-size: 1rem;
      //     line-height: 2rem;
      //     height: 2rem;
      //     width: 100%;
      //     color: #d3d7f7;
      //     outline: none;
      //     border: none;
      //     background-color: rgba(0, 0, 0, 0);
      //     padding: .625rem 0;
      //   }
      >>>.el-input {
        height: 3.25rem;
        line-height: 3.1875rem;
        background-color: #2A3940;

        .el-input__inner {
          height: 2rem;
          background-color: #2A3940;
        }
      }

      .loginBtn {
        width: 100%;
        padding: .75rem 0;
        border: .0625rem solid #d3d7f7;
        font-size: 1rem;
        color: #d3d7f7;
        cursor: pointer;
        background: #64C8C8;
        border-radius: .25rem;
        margin-top: .625rem;

        &:hover {
          color: #fff;
          background: #0090ff;
          border-color: #0090ff;
        }
      }

      .tip {
        font-size: .75rem;
        padding-top: 1.25rem;
      }
    }

  }
}

.copyright {
  position: absolute;
  width: 100%;
  color: #fff;
  // left: 36.5%;
  text-align: center;
  bottom: 2rem;
  font-size: 1.5rem;
}

input::-webkit-input-placeholder {
  color: #d3d7f7;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #d3d7f7;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #d3d7f7;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #d3d7f7;
}

@-ms-keyframes cloud {
  0% {
    -ms-transform: translate(-50%, -50%);
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    -ms-transform: translate(-50%, -40%);
  }
}

@-moz-keyframes cloud {
  0% {
    -moz-transform: translate(-50%, -50%);
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    -moz-transform: translate(-50%, -40%);
  }
}

@-o-keyframes cloud {
  0% {
    -o-transform: translate(-50%, -50%);
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    -o-transform: translate(-50%, -40%);
  }
}

@-webkit-keyframes cloud {
  0% {
    -webkit-transform: translate(-50%, -50%);
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    -webkit-transform: translate(-50%, -40%);
  }
}

@keyframes cloud {
  0% {
    transform: translate(-50%, -50%);
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -40%);
  }
}

::v-deep .el-input__inner,
.el-range-editor.el-input__inner {
  color: #fff;
}

>>>.el-form-item__error {
  margin-left: 2.5rem;
  top: 72% !important;
}</style>
