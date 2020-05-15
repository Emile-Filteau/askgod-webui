<template>
  <v-card>
    <v-toolbar :flat="true">
      <v-btn
        icon
        @click="closeDialog">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fill-height fluid class="top-spacing">
      <v-row align="center" justify="center">
        <v-col v-if="showAnimation">
          <p class="text-md-center display-4 font-weight-bold">{{ latestScore.score.value }} pts</p>
          <p class="text-md-center display-3">{{ latestScore.team.name }}</p>
          <p class="text-md-center display-3">{{ latestScore.team.flagEmoji }}</p>
        </v-col>
        <!-- <v-col v-else>
          <p class="text-md-center display-3">Waiting score updates!</p>
          <br/>
          <div class="text-center">
            <v-progress-circular
              :size="70"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-col> -->
      </v-row>
      <div class="fireworks--wrapper" v-if="showAnimation">
        <div class="pyro">
          <div class="before"/>
          <div class="after"/>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showAnimation: false,
    }
  },
  watch: {
    latestScore(newVal, oldVal) {
      this.showAnimation = true
      setTimeout(() => this.showAnimation = false, 5000)
    }
  },
  mounted() {
    setTimeout(() => {

    }, 5000)
  },
  computed: {
    ...mapGetters([
      'latestScore',
    ]),
  },
  methods: {
    closeDialog () {
      this.$store.commit('showOverlayAnimation', false);
    }
  }
}
</script>

<style scoped>
.top-spacing {
  top: 15vh;
  position: relative;
}

.fireworks--wrapper {
  position: absolute;
  display: block;
  width: 98vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Source: https://codepen.io/yshlin/pen/ylDEk */
.pyro > .before,
.pyro > .after {
  position: relative;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
  -moz-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -webkit-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -o-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -ms-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro > .after {
  -moz-animation-delay: 1.25s, 1.25s, 1.25s;
  -webkit-animation-delay: 1.25s, 1.25s, 1.25s;
  -o-animation-delay: 1.25s, 1.25s, 1.25s;
  -ms-animation-delay: 1.25s, 1.25s, 1.25s;
  animation-delay: 1.25s, 1.25s, 1.25s;
  -moz-animation-duration: 1.25s, 1.25s, 6.25s;
  -webkit-animation-duration: 1.25s, 1.25s, 6.25s;
  -o-animation-duration: 1.25s, 1.25s, 6.25s;
  -ms-animation-duration: 1.25s, 1.25s, 6.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
}

@-webkit-keyframes bang {
  to {
    box-shadow: 175px -403.6666666667px #88ff00, -80px -348.6666666667px #00aeff, -90px -107.6666666667px #ff00cc, 193px -364.6666666667px #5e00ff, -116px -287.6666666667px #ff5e00, 180px -118.6666666667px #8800ff, 111px -88.6666666667px #ff4000, 151px 47.3333333333px #00aeff, 103px -270.6666666667px #ff0015, -231px -29.6666666667px #ff00b3, 205px -83.6666666667px #ff00f2, -129px -249.6666666667px #ee00ff, 237px 76.3333333333px #84ff00, 249px -44.6666666667px #00ff40, -195px -5.6666666667px #5eff00, 170px -92.6666666667px #7700ff, 20px -373.6666666667px #ff00a6, 45px -103.6666666667px #00b7ff, 92px -13.6666666667px #001eff, 211px -139.6666666667px #002fff, -113px 24.3333333333px #ff7700, -104px -283.6666666667px #ff006a, -25px -70.6666666667px #ffae00, -234px -150.6666666667px #bfff00, -137px -310.6666666667px #ff00d9, -169px 79.3333333333px #2f00ff, -3px 82.3333333333px #00ff1e, 136px -240.6666666667px #80ff00, 219px -109.6666666667px #00ff73, -21px -351.6666666667px #7bff00, 175px -31.6666666667px #ff0048, 223px -94.6666666667px #5100ff, -104px 10.3333333333px #00ffaa, -142px -306.6666666667px #ff0026, -230px 8.3333333333px #007bff, 171px -44.6666666667px #0900ff, 76px -338.6666666667px #37ff00, -199px -253.6666666667px #00ffee, 34px -240.6666666667px #6200ff, 240px -351.6666666667px #ff0073, -3px -393.6666666667px #ffcc00, -237px -216.6666666667px #ff00d9, 240px -75.6666666667px #ff9d00, 45px -182.6666666667px #7300ff, -19px -404.6666666667px #ff9100, -24px 12.3333333333px #00eeff, 91px 34.3333333333px #ff00a2, 123px -332.6666666667px #00fbff, -45px 79.3333333333px #ffb300, -179px -411.6666666667px #ff00e1, -121px -277.6666666667px #6f00ff;
  }
}
@-moz-keyframes bang {
  to {
    box-shadow: 175px -403.6666666667px #88ff00, -80px -348.6666666667px #00aeff, -90px -107.6666666667px #ff00cc, 193px -364.6666666667px #5e00ff, -116px -287.6666666667px #ff5e00, 180px -118.6666666667px #8800ff, 111px -88.6666666667px #ff4000, 151px 47.3333333333px #00aeff, 103px -270.6666666667px #ff0015, -231px -29.6666666667px #ff00b3, 205px -83.6666666667px #ff00f2, -129px -249.6666666667px #ee00ff, 237px 76.3333333333px #84ff00, 249px -44.6666666667px #00ff40, -195px -5.6666666667px #5eff00, 170px -92.6666666667px #7700ff, 20px -373.6666666667px #ff00a6, 45px -103.6666666667px #00b7ff, 92px -13.6666666667px #001eff, 211px -139.6666666667px #002fff, -113px 24.3333333333px #ff7700, -104px -283.6666666667px #ff006a, -25px -70.6666666667px #ffae00, -234px -150.6666666667px #bfff00, -137px -310.6666666667px #ff00d9, -169px 79.3333333333px #2f00ff, -3px 82.3333333333px #00ff1e, 136px -240.6666666667px #80ff00, 219px -109.6666666667px #00ff73, -21px -351.6666666667px #7bff00, 175px -31.6666666667px #ff0048, 223px -94.6666666667px #5100ff, -104px 10.3333333333px #00ffaa, -142px -306.6666666667px #ff0026, -230px 8.3333333333px #007bff, 171px -44.6666666667px #0900ff, 76px -338.6666666667px #37ff00, -199px -253.6666666667px #00ffee, 34px -240.6666666667px #6200ff, 240px -351.6666666667px #ff0073, -3px -393.6666666667px #ffcc00, -237px -216.6666666667px #ff00d9, 240px -75.6666666667px #ff9d00, 45px -182.6666666667px #7300ff, -19px -404.6666666667px #ff9100, -24px 12.3333333333px #00eeff, 91px 34.3333333333px #ff00a2, 123px -332.6666666667px #00fbff, -45px 79.3333333333px #ffb300, -179px -411.6666666667px #ff00e1, -121px -277.6666666667px #6f00ff;
  }
}
@-o-keyframes bang {
  to {
    box-shadow: 175px -403.6666666667px #88ff00, -80px -348.6666666667px #00aeff, -90px -107.6666666667px #ff00cc, 193px -364.6666666667px #5e00ff, -116px -287.6666666667px #ff5e00, 180px -118.6666666667px #8800ff, 111px -88.6666666667px #ff4000, 151px 47.3333333333px #00aeff, 103px -270.6666666667px #ff0015, -231px -29.6666666667px #ff00b3, 205px -83.6666666667px #ff00f2, -129px -249.6666666667px #ee00ff, 237px 76.3333333333px #84ff00, 249px -44.6666666667px #00ff40, -195px -5.6666666667px #5eff00, 170px -92.6666666667px #7700ff, 20px -373.6666666667px #ff00a6, 45px -103.6666666667px #00b7ff, 92px -13.6666666667px #001eff, 211px -139.6666666667px #002fff, -113px 24.3333333333px #ff7700, -104px -283.6666666667px #ff006a, -25px -70.6666666667px #ffae00, -234px -150.6666666667px #bfff00, -137px -310.6666666667px #ff00d9, -169px 79.3333333333px #2f00ff, -3px 82.3333333333px #00ff1e, 136px -240.6666666667px #80ff00, 219px -109.6666666667px #00ff73, -21px -351.6666666667px #7bff00, 175px -31.6666666667px #ff0048, 223px -94.6666666667px #5100ff, -104px 10.3333333333px #00ffaa, -142px -306.6666666667px #ff0026, -230px 8.3333333333px #007bff, 171px -44.6666666667px #0900ff, 76px -338.6666666667px #37ff00, -199px -253.6666666667px #00ffee, 34px -240.6666666667px #6200ff, 240px -351.6666666667px #ff0073, -3px -393.6666666667px #ffcc00, -237px -216.6666666667px #ff00d9, 240px -75.6666666667px #ff9d00, 45px -182.6666666667px #7300ff, -19px -404.6666666667px #ff9100, -24px 12.3333333333px #00eeff, 91px 34.3333333333px #ff00a2, 123px -332.6666666667px #00fbff, -45px 79.3333333333px #ffb300, -179px -411.6666666667px #ff00e1, -121px -277.6666666667px #6f00ff;
  }
}
@-ms-keyframes bang {
  to {
    box-shadow: 175px -403.6666666667px #88ff00, -80px -348.6666666667px #00aeff, -90px -107.6666666667px #ff00cc, 193px -364.6666666667px #5e00ff, -116px -287.6666666667px #ff5e00, 180px -118.6666666667px #8800ff, 111px -88.6666666667px #ff4000, 151px 47.3333333333px #00aeff, 103px -270.6666666667px #ff0015, -231px -29.6666666667px #ff00b3, 205px -83.6666666667px #ff00f2, -129px -249.6666666667px #ee00ff, 237px 76.3333333333px #84ff00, 249px -44.6666666667px #00ff40, -195px -5.6666666667px #5eff00, 170px -92.6666666667px #7700ff, 20px -373.6666666667px #ff00a6, 45px -103.6666666667px #00b7ff, 92px -13.6666666667px #001eff, 211px -139.6666666667px #002fff, -113px 24.3333333333px #ff7700, -104px -283.6666666667px #ff006a, -25px -70.6666666667px #ffae00, -234px -150.6666666667px #bfff00, -137px -310.6666666667px #ff00d9, -169px 79.3333333333px #2f00ff, -3px 82.3333333333px #00ff1e, 136px -240.6666666667px #80ff00, 219px -109.6666666667px #00ff73, -21px -351.6666666667px #7bff00, 175px -31.6666666667px #ff0048, 223px -94.6666666667px #5100ff, -104px 10.3333333333px #00ffaa, -142px -306.6666666667px #ff0026, -230px 8.3333333333px #007bff, 171px -44.6666666667px #0900ff, 76px -338.6666666667px #37ff00, -199px -253.6666666667px #00ffee, 34px -240.6666666667px #6200ff, 240px -351.6666666667px #ff0073, -3px -393.6666666667px #ffcc00, -237px -216.6666666667px #ff00d9, 240px -75.6666666667px #ff9d00, 45px -182.6666666667px #7300ff, -19px -404.6666666667px #ff9100, -24px 12.3333333333px #00eeff, 91px 34.3333333333px #ff00a2, 123px -332.6666666667px #00fbff, -45px 79.3333333333px #ffb300, -179px -411.6666666667px #ff00e1, -121px -277.6666666667px #6f00ff;
  }
}
@keyframes bang {
  to {
    box-shadow: 175px -403.6666666667px #88ff00, -80px -348.6666666667px #00aeff, -90px -107.6666666667px #ff00cc, 193px -364.6666666667px #5e00ff, -116px -287.6666666667px #ff5e00, 180px -118.6666666667px #8800ff, 111px -88.6666666667px #ff4000, 151px 47.3333333333px #00aeff, 103px -270.6666666667px #ff0015, -231px -29.6666666667px #ff00b3, 205px -83.6666666667px #ff00f2, -129px -249.6666666667px #ee00ff, 237px 76.3333333333px #84ff00, 249px -44.6666666667px #00ff40, -195px -5.6666666667px #5eff00, 170px -92.6666666667px #7700ff, 20px -373.6666666667px #ff00a6, 45px -103.6666666667px #00b7ff, 92px -13.6666666667px #001eff, 211px -139.6666666667px #002fff, -113px 24.3333333333px #ff7700, -104px -283.6666666667px #ff006a, -25px -70.6666666667px #ffae00, -234px -150.6666666667px #bfff00, -137px -310.6666666667px #ff00d9, -169px 79.3333333333px #2f00ff, -3px 82.3333333333px #00ff1e, 136px -240.6666666667px #80ff00, 219px -109.6666666667px #00ff73, -21px -351.6666666667px #7bff00, 175px -31.6666666667px #ff0048, 223px -94.6666666667px #5100ff, -104px 10.3333333333px #00ffaa, -142px -306.6666666667px #ff0026, -230px 8.3333333333px #007bff, 171px -44.6666666667px #0900ff, 76px -338.6666666667px #37ff00, -199px -253.6666666667px #00ffee, 34px -240.6666666667px #6200ff, 240px -351.6666666667px #ff0073, -3px -393.6666666667px #ffcc00, -237px -216.6666666667px #ff00d9, 240px -75.6666666667px #ff9d00, 45px -182.6666666667px #7300ff, -19px -404.6666666667px #ff9100, -24px 12.3333333333px #00eeff, 91px 34.3333333333px #ff00a2, 123px -332.6666666667px #00fbff, -45px 79.3333333333px #ffb300, -179px -411.6666666667px #ff00e1, -121px -277.6666666667px #6f00ff;
  }
}
@-webkit-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-moz-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-o-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-ms-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-webkit-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-moz-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-o-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-ms-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
</style>
