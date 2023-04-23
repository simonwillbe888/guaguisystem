<!-- <template>
  <div style="padding: 1%">
    <!-- <div class="video-area2 commen-border">
      <dv-border-box-12>
        <h5 class="header-commen">{{ $t('dashboard.two_video_label') }}</h5>
        <div class="body-commen">
          <el-button type="primary"
                     size="mini"
                     @click="openInfraredControl()"
                     style="float:right">{{ $t('dashboard.feature_label') }}</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="loginOne()"
                     style="float:right;margin:0 20px;">{{ $t('dashboard.login_label') }}</el-button>
        </div>
        <div class="body-commen-video">
          <video name="videoElement"
                 id="videoElement"
                 class="centeredVideo"
                 controls
                 muted
                 autoplay
                 width="300"
                 height="300">
          </video>
        </div>
      </dv-border-box-12>
    </div> -->
    <div class="video-area1 commen-border">
      <dv-border-box-12>
        <h5 class="header-commen">
          {{ $t('dashboard.one_video_label') }}
        </h5>
        <div class="body-commen">
          <el-button
            type="primary"
            size="mini"
            @click="openVisibleControl()"
            style="float: left"
            >{{ $t('dashboard.feature_label') }}</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="loginTwo()"
            style="float: left; margin: 0 20px"
            >{{ $t('dashboard.login_label') }}</el-button
          >
        </div>
        <div class="body-commen-video">
          <video
            id="videoElement2"
            class="centeredVideo"
            controls
            muted
            autoplay
            width="300"
            height="300"
          ></video>
        </div>
      </dv-border-box-12>
    </div>
    <div class="map-area commen-border">
      <dv-border-box-12>
        <h4 class="header-commen">{{ $t('dashboard.inspect_map_label') }}</h4>
        <index />
      </dv-border-box-12>
    </div>

    <div class="cboth"></div>
    <el-drawer
      class="drawer-commen"
      title="一号影像控制"
      :visible.sync="drawer1"
      :show-close="false"
      :modal="false"
      :with-header="false"
      direction="rtl"
      size="15%"
    >
      <el-divider content-position="left">{{
        $t('dashboard.video_control_label')
      }}</el-divider>
      <div class="box son-item">
        <div class="top">
          <el-button
            type="success"
            icon="el-icon-caret-top"
            @click="moveTopOne()"
          ></el-button>
        </div>
        <div class="left">
          <el-button
            type="success"
            icon="el-icon-caret-left"
            @click="moveLeftOne()"
          ></el-button>
        </div>
        <div class="right">
          <el-button
            type="success"
            icon="el-icon-caret-right"
            @click="moveRightOne()"
          ></el-button>
        </div>
        <div class="center">
          <el-button
            type="danger"
            icon="el-icon-video-pause"
            circle
            @click="moveCenterOne()"
          ></el-button>
        </div>
        <div class="bottom">
          <el-button
            type="success"
            icon="el-icon-caret-bottom"
            @click="moveBottoOne()"
          ></el-button>
        </div>
      </div>
      <div class="son-item" style="text-align: center; margin-top: 20px">
        <el-button type="primary" icon="el-icon-plus" @click="enlarge()">{{
          $t('dashboard.enlarge_label')
        }}</el-button>
        <el-button type="primary" icon="el-icon-minus" @click="shrink()">{{
          $t('dashboard.shrink_label')
        }}</el-button>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button
          type="primary"
          style="margin-top: 20px"
          size="mini"
          icon="el-icon-video-camera-solid"
          @click="startVideo()"
          >{{ $t('dashboard.start_video_label') }}</el-button
        >
        <el-button
          type="danger"
          style="margin-top: 20px"
          size="mini"
          icon="el-icon-video-pause"
          @click="endVideo()"
          >{{ $t('dashboard.end_video_label') }}</el-button
        >
        <el-button
          style="margin-top: 20px"
          type="primary"
          icon="el-icon-camera"
          size="mini"
          @click="takePhoto()"
          >{{ $t('dashboard.photo_label') }}</el-button
        >
      </div>
    </el-drawer>
    <el-drawer
      class="drawer-commen"
      title="二号影像控制"
      :visible.sync="drawer2"
      :show-close="false"
      :modal="false"
      :with-header="false"
      direction="ltr"
      size="15%"
    >
      <el-divider content-position="left">{{
        $t('dashboard.video_control_label')
      }}</el-divider>
      <div class="box son-item">
        <div class="top">
          <el-button
            type="success"
            icon="el-icon-caret-top"
            @click="moveTopTwo()"
          ></el-button>
        </div>
        <div class="left">
          <el-button
            type="success"
            icon="el-icon-caret-left"
            @click="moveLeftTwo()"
          ></el-button>
        </div>
        <div class="right">
          <el-button
            type="success"
            icon="el-icon-caret-right"
            @click="moveRightTwo()"
          ></el-button>
        </div>
        <div class="center">
          <el-button
            type="danger"
            icon="el-icon-video-pause"
            circle
            @click="moveCenterTwo()"
          ></el-button>
        </div>
        <div class="bottom">
          <el-button
            type="success"
            icon="el-icon-caret-bottom"
            @click="moveBottoTwo()"
          ></el-button>
        </div>
      </div>
      <div class="son-item" style="text-align: center; margin-top: 20px">
        <el-button type="primary" icon="el-icon-plus" @click="enlarge()">{{
          $t('dashboard.enlarge_label')
        }}</el-button>
        <el-button type="primary" icon="el-icon-minus" @click="shrink()">{{
          $t('dashboard.shrink_label')
        }}</el-button>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button
          type="primary"
          style="margin-top: 20px"
          icon="el-icon-video-camera-solid"
          size="mini"
          @click="startVideo()"
          >{{ $t('dashboard.start_video_label') }}</el-button
        >
        <el-button
          type="danger"
          style="margin-top: 20px"
          icon="el-icon-video-pause"
          size="mini"
          @click="endVideo()"
          >{{ $t('dashboard.end_video_label') }}</el-button
        >
        <el-button
          style="margin-top: 20px"
          type="primary"
          icon="el-icon-camera"
          size="mini"
          @click="takePhoto()"
          >{{ $t('dashboard.photo_label') }}</el-button
        >
      </div>
    </el-drawer>

    <el-dialog
      :title="$t('dashboard.login_camera_label')"
      :visible.sync="dialogFormVisible"
    >
      <el-form label-position="left" label-width="120px" :model="photoForm">
        <el-form-item
          :label="$t('dashboard.select_camera_label')"
          prop="camera"
        >
          <el-select clearable v-model="photoForm.camera">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button type="primary" @click="addSuccess(photoForm)">{{
            $t('user.Confirm')
          }}</el-button>
          <el-button type="primary" plain @click="dialogFormVisible = false">{{
            $t('user.Cancel')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="$t('dashboard.login_camera_label')"
      :visible.sync="dialogFormVisibleTwo"
    >
      <el-form label-position="left" label-width="120px" :model="photoForm">
        <el-form-item
          :label="$t('dashboard.select_camera_label')"
          prop="camera"
        >
          <el-select clearable v-model="photoForm.camera">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="common-form-footer">
          <el-button type="primary" @click="addSuccessTwo(photoForm)">{{
            $t('user.Confirm')
          }}</el-button>
          <el-button
            type="primary"
            plain
            @click="dialogFormVisibleTwo = false"
            >{{ $t('user.Cancel') }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import index from '@/views/map/index';
import flvjs from '@/assets/js/flv.js';
import {
  startPanLeft,
  endPanLeft,
  startPanRight,
  endPanRight,
  startTiltUp,
  endTiltUp,
  startTiltDown,
  endTiltDown,
  login,
  startRecord,
  endRecord,
  takePhoto,
  getPTZ,
  setZ,
} from '@/api/dashboard.js';
import { getAccessoryByID, getCarrierList } from '@/api/accesso';

export default {
  components: {
    index,
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisibleTwo: false,
      options: [],
      photoForm: {
        camera: '',
      },
      drawer1: false,
      drawer2: false,
      cleanBuff: '',
      cleanBuff2: '',
      jumpToEndBuffer: () => {
        this.video = document.getElementById('videoElement');
        if (this.video) {
          let buffered = this.video.buffered;
          if (buffered.length > 0) {
            let end = buffered.end(0);
            if (end - this.video.currentTime > 0.15) {
              this.video.currentTime = end - 0.1;
            }
          }
        }
      },
      jumpToEndBuffer2: () => {
        this.video = document.getElementById('videoElement2');
        if (this.video) {
          let buffered = this.video.buffered;
          if (buffered.length > 0) {
            let end = buffered.end(0);
            if (end - this.video.currentTime > 0.15) {
              this.video.currentTime = end - 0.1;
            }
          }
        }
      },
      initZ: 0,
      flvPlayer: '',
      flvPlayer2: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let self = this;
      self.options = [];
      getCarrierList()
        .then((response) => {
          let accessTypeArr = response.data;
          for (let i = 0, len = accessTypeArr.length; i < len; i++) {
            let optionObj = {
              value: accessTypeArr[i].id,
              label: accessTypeArr[i].accessoryName,
            };
            self.options.push(optionObj);
          }
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    startCameraOne() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          // url: 'http://192.168.1.11:8088/live?port=1985&app=live&stream=mystream'
          url: 'http://localhost:8080/live?port=1985&app=live&stream=mystream',
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();

        this.cleanBuff = setInterval(this.jumpToEndBuffer, 1 * 60 * 1000);
      }
    },
    startCameraTwo() {
      if (flvjs.isSupported()) {
        var videoElement2 = document.getElementById('videoElement2');
        this.flvPlayer2 = flvjs.createPlayer({
          type: 'flv',
          // url: 'http://192.168.1.11:8088/live?port=1985&app=live&stream=mystream'
          url: 'http://localhost:8080/live?port=1985&app=live&stream=mystream',
        });
        this.flvPlayer2.attachMediaElement(videoElement2);
        this.flvPlayer2.load();
        this.flvPlayer2.play();

        this.cleanBuff2 = setInterval(this.jumpToEndBuffer2, 1 * 60 * 1000);
      }
    },
    getCameraPara() {
      let self = this;
      getPTZ()
        .then((response) => {
          let data = response.data;
          self.initZ = data[2];
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    loginOne() {
      this.dialogFormVisible = true;
    },
    loginTwo() {
      this.dialogFormVisibleTwo = true;
    },
    addSuccess(obj) {
      let self = this;
      this.dialogFormVisible = false;
      getAccessoryByID(obj.camera)
        .then((response) => {
          console.log("查看云台信息",response)
          let data = response.data;
          login(data)
            .then((response) => {
              let data = response.data;
              self.startCameraOne();
              self.getCameraPara();
            })
            .catch((error) => {
              self.$notify({
                title: self.$t('user.Failure'),
                message: self.$t('user.interface_call_failed_tip'),
                type: 'error',
                duration: 1000,
              });
            });
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    addSuccessTwo(obj) {
      let self = this;
      this.dialogFormVisibleTwo = false;
      getAccessoryByID(obj.camera)
        .then((response) => {
          let data = response.data;
          login(data)
            .then((response) => {
              let data = response.data;
              self.startCameraTwo();
              self.getCameraPara();
            })
            .catch((error) => {
              self.$notify({
                title: self.$t('user.Failure'),
                message: self.$t('user.interface_call_failed_tip'),
                type: 'error',
                duration: 1000,
              });
            });
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    quitOne() {
      this.flvPlayer.stop();
    },
    quitTwo() {
      // this.flvPlayer2.stopPlay();
      this.flvPlayer2 = '';
    },
    openVisibleControl() {
      this.drawer1 = true;
    },
    openInfraredControl() {
      this.drawer2 = true;
    },
    componentDidMount() {
      this.cleanBuff = setInterval(this.jumpToEndBuffer, 1 * 60 * 1000);
      this.cleanBuff2 = setInterval(this.jumpToEndBuffer2, 1 * 60 * 1000);
    },
    moveTopOne() {
      let self = this;
      startTiltUp()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
      endTiltUp()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    moveLeftOne() {
      let self = this;
      startPanLeft()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
      endPanLeft()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    moveRightOne() {
      let self = this;
      startPanRight()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
      endPanRight()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    moveCenterOne() {},
    moveBottoOne() {
      let self = this;
      startTiltDown()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
      endTiltDown()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    moveTopTwo() {},
    moveLeftTwo() {},
    moveRightTwo() {},
    moveCenterTwo() {},
    moveBottoTwo() {},
    startVideo() {
      let self = this;
      startRecord()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    endVideo() {
      let self = this;
      endRecord()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    takePhoto() {
      let self = this;
      takePhoto()
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          self.$notify({
            title: self.$t('user.Failure'),
            message: self.$t('user.interface_call_failed_tip'),
            type: 'error',
            duration: 1000,
          });
        });
    },
    enlarge() {
      let self = this;
      if (typeof this.initZ == 'number' && this.initZ >= 0) {
        this.initZ += 0.5;
        setZ(this.initZ)
          .then((response) => {
            let data = response.data;
          })
          .catch((error) => {
            self.$notify({
              title: self.$t('user.Failure'),
              message: self.$t('user.interface_call_failed_tip'),
              type: 'error',
              duration: 1000,
            });
          });
      }
    },
    shrink() {
      let self = this;
      if (typeof this.initZ == 'number' && this.initZ > 0) {
        this.initZ -= 0.5;
        setZ(this.initZ)
          .then((response) => {
            let data = response.data;
          })
          .catch((error) => {
            self.$notify({
              title: self.$t('user.Failure'),
              message: self.$t('user.interface_call_failed_tip'),
              type: 'error',
              duration: 1000,
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.video-area1 {
  width: 25%;
  text-align: center;
  float: left;
}
.centeredVideo {
  display: block;
  width: 262px;
  height: 262px;
  // margin-top: -50px;
}
.video-area2 {
  width: 25%;
  text-align: center;
  float: right;
}
.map-area {
  float: left;
  width: 680px;
  height: 500px;
  text-align: center;
}
.commen-border {
  border-radius: 20px;
  .header-commen {
    padding: 10px 0;
    margin: 10px 10px;
  }
  .body-commen {
    margin: 0 10px 50px 10px;
  }
  .body-commen-video {
    margin: 10px;
    padding: 5px 0 10px 0;
    width: 262px;
    height: 290px;
  }
}
.cboth {
  clear: both;
}
.box {
  width: 80px;
  margin: 0 auto;
  .top {
    text-align: center;
    margin: 10px;
  }

  .left {
    float: left;
    width: 20px;
  }

  .right {
    float: right;
    width: 20px;
  }

  .center {
    text-align: center;
  }

  .bottom {
    clear: both;
    text-align: center;
    margin: 10px;
  }
}

.drawer-commen {
  .son-item {
    >>> .el-button {
      padding: 0;
      margin: 0;
    }
  }
}
>>> .el-dialog {
  width: 500px;
}

>>> .el-dialog__body {
  padding: 20px;
  margin-left: 88px;
}
</style> -->
