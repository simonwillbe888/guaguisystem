<template>
  <div class="login-container">
    <div class="layer">
      <div class="bgd">

        <div class="slash1"
          style="width: 43rem; height: 9.375rem; border-width: 2px; border-color: rgb(255, 255, 255); border-style: dashed; transition: unset; border-radius: 50%;   transform: rotate(40deg);">

        </div>
        <div class="slash2"
          style="width: 43rem; height: 9.375rem; border-width: 2px; border-color: rgb(255, 255, 255); border-style: dashed; transition: unset; border-radius: 50%;  transform: rotate(140deg);">

        </div>
        <img src="../../assets/img/loginComputer.png" alt="">
        <div class="iconTitle" style="top:21% ;left:13%;">
          <div class="box">
            <svg-icon icon-class="loginvideo"></svg-icon>
          </div>
          <span>
            实时监控
          </span>
        </div>
        <div class="iconTitle" style="top:21% ;left:36.5%;">
          <span>
            报警联动
          </span>
          <div class="box" style="background: #7aebeb;">
            <svg-icon icon-class="loginconnect"></svg-icon>
          </div>

        </div>
        <div class="iconTitle" style="top:45%;left:5%">
          <div class="box" style="background: #7aebeb;">
            <svg-icon icon-class="logindeal"> </svg-icon>
          </div>
          <span>
            应急处置
          </span>
        </div>
        <div class="iconTitle" style="bottom: 21%;left: 13%;">
          <div class="box" style="background: #7aebeb;">
            <svg-icon icon-class="loginalarm"> </svg-icon>
          </div>
          <span>
            AI告警
          </span>
        </div>
        <div class="iconTitle" style="top: 45%;left:44%">
          <div class="box">
            <svg-icon icon-class="loginsetting"> </svg-icon>
          </div>
          <span>
            隧道巡检
          </span>
        </div>
        <div class="iconTitle" style="bottom: 21%;left:44%">
          <div class="box">
            <svg-icon icon-class="logindata"> </svg-icon>
          </div>
          <span>
            数据分析
          </span>
        </div>



      </div>
      <div class="some-space">
        <div>
          <img src="../../assets/img/logo@2x.png" alt="" class="logo">
          <div class="form">

            <div style="color:#000000;font-size: 4rem;font-weight: bold;">应急机器人管理系统</div>

            <el-form :inline-message="true" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
              label-width="0rem" class="demo-ruleForm">
              <el-form-item prop="username">
                <div class="item">
                  <i class="el-icon-user-solid"></i>
                  <el-input type="text" class="input" v-model.trim="loginForm.username" auto-complete="off"
                    placeholder="账号" clearable>
                  </el-input>
                </div>
              </el-form-item>

              <el-form-item prop="password">
                <div class="item">
                  <i class="el-icon-lock" style="color: #64C8C8;"></i>
                  <el-input type="password" v-model.trim="loginForm.password" auto-complete="off" placeholder="密码"
                    clearable>
                  </el-input>
                </div>
              </el-form-item>
              <!-- <el-checkbox class="remember" v-model="checked">记住密码</el-checkbox> -->

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
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: transparent;
  }

  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .bgd {
    width: 60%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 27rem;
      height: 22.5rem;
      z-index: 999;
    }

    .slash1 {
      position: absolute;

    }

    .slash2 {
      position: absolute;

    }
   .iconTitle{
    display: flex;
    align-items: center;
    position: absolute;
    color: var(--font-color);
    font-size: 1.5rem;
    span{
      padding:0 15px;
    }
    .box {
      width: 3.75rem;
      height: 3.75rem;
      background: #59b3b3;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .svg-icon {
        width: 2rem;
        height: 2rem;
      }
    }
    }
  }

  .some-space {
    background: var(--loginbgd);
    font-weight: 100;
    position: relative;
    width: 40%;
    padding-left: 2%;
    // top: 17.6875rem;
    z-index: 1001;
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      width: 25rem;
      height: 5.3125rem;
      margin-left: 5.625rem;
      margin-bottom: 2.5rem;
    }

    .form {

      .item {
        display: flex;
        align-items: center;

        // margin-bottom: 1.5625rem;
        i {
          color: #64C8C8;
          width: 30px;
          height: 30px;
          margin-right: .625rem;
          font-size: 1.5rem;
        }

        .input {
          margin: 40px 0;
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

    }

    .loginBtn {
      width: 33.5rem;
      padding: .75rem 0;
      border: .0625rem solid #d3d7f7;
      font-size: 1rem;
      margin-left: 40px;
      color: #fff;
      cursor: pointer;
      background: #64C8C8;
      border-radius: .25rem;
      margin-top: .625rem;
    }

    .tip {
      font-size: .75rem;
      padding-top: 1.25rem;
    }
  }
}


.copyright {
  position: absolute;
  color: #000;
  left: 20.5%;
  bottom: 2rem;
  font-size: 1.25rem;
}

::v-deep .el-input__inner {
  color: #64C8C8 !important;
  height: 3.125rem;
  width:33.5rem;
  border: 2px solid #59b3b3;
  border-radius: 5px;
}
::v-deep .el-input__clear {
  display: none;
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

.form ::v-deep .el-input__inner,
.el-range-editor.el-input__inner {
  color: #606266;
}

>>>.el-form-item__error {
  margin-left: 2.5rem;
  top: 72% !important;
}
</style>
