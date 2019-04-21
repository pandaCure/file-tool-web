<template>
  <div id="app">
    <ul id="nav">
      <div class="logo">
        <img src="./assets/logo.jpg" alt="" class="logo-img">
        <div class="logo-text" data-value="钟繇 转换工具">钟繇 转换工具</div>
      </div>
      <li v-for="(route, key) in initRoute" :key="key" class="nav-item">
        <router-link :to="route.path">{{route.name}}</router-link>
      </li>
    </ul>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  initRoute = [
    {
      path: '/',
      name: '中文简体转中文繁体'
    },
    {
      path: '/about',
      name: '中文繁体转中文简体'
    }
  ]
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
.logo {
  height: 40px;
  margin-bottom: 30px;
  .logo-img {
    border-radius: 50%;
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    line-height: 40px;
  }
  .logo-text {
    display: inline-block;
    margin-left: 10px;
    line-height: 40px;
    vertical-align: middle;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    transition: all 400ms ease;
    color: #fff;
    max-width: 100%;
    &::before,
    &::after {
      content: attr(data-value);
      position: absolute;
      top: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0);
      clip: rect(0, 0, 0, 0);
    }
    &::before {
      left: -1px;
      text-shadow: 4px 0 #ff3f1a;
      animation: glitch-loop-1 .8s infinite ease-in-out alternate-reverse;
    }
    &::after {
      left: 1px;
      text-shadow: -5px 0 #00a7e0;
      animation: glitch-loop-2 .8s infinite ease-in-out alternate-reverse;
    }
  }
}
#nav {
  width: 15%;
  height: 100vh;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, .6);
  padding-top: 50px;
  .nav-item {
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: black;
  }
  .nav-item:hover {
    background-color: gainsboro;
    a {
      color: white;
    }
  }
  a {
    font-weight: bold;
    color: black;
    &.router-link-exact-active {
      color: #fff;
    }
  }
}
.right {
  flex: 1;
  margin-top: 50px;
}
li {
  list-style-type: none;
}

a {
  text-decoration: none;
  outline: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@keyframes glitch-loop-1 {
  0% {
    clip: rect(18px, 9999px, 9px, 0);
  }

  25% {
    clip: rect(13px, 9999px, 99px, 0);
  }

  50% {
    clip: rect(25px, 9999px, 102px, 0);
  }

  75% {
    clip: rect(15px, 9999px, 92px, 0);
  }

  100% {
    clip: rect(91px, 9999px, 98px, 0);
  }
}
@keyframes glitch-loop-2 {
  0% {
    top: -1px;
    left: 1px;
    clip: rect(33px, 9999px, 119px, 0);
  }

  25% {
    top: -6px;
    left: 4px;
    clip: rect(40px, 9999px, 19px, 0);
  }

  50% {
    top: -3px;
    left: 2px;
    clip: rect(39px, 9999px, 11px, 0);
  }

  75% {
    top: 0;
    left: -4px;
    clip: rect(48px, 9999px, 53px, 0);
  }

  100% {
    top: -1px;
    left: -1px;
    clip: rect(15px, 9999px, 149px, 0);
  }
}
</style>
