<template>
  <div class="header">
    <div class="inner">
      <nav class="navbar__menu">
        <router-link to="/" exact>
          <img class="logo" src="~/assets/img/hsbc.png" alt="logo">
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.header
  background-color #FFF
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
    a
      color rgba(255, 255, 255, .8)
      line-height 24px
      transition color .15s ease
      display inline-block
      vertical-align middle
      font-weight 300
      letter-spacing .075em
      margin-right 1.8em
      &:hover
        color #111111
      &.router-link-active
        color #111111
        font-weight 400
      &:nth-child(6)
        margin-right 0
    .github
      color #111111
      font-size .9em
      margin 0
      float right

.logo
  width 40px
  margin-right 10px
  display inline-block
  vertical-align middle

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
      a
        margin-right 1em
</style>
