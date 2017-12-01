<template>
  <section class="payment-view">
    <div style="margin: 15px 15px;margin-bottom: 10%">
      Account balance: $97.98
    </div>
  <div class="content">
    <div class="subsection" style="text-align: center;margin-bottom: 10%">
        Payment sent successfully!
    </div>
    <div class="subsection" style="text-align: center;margin-bottom: 10%">
        Your Payment # is: 100001
    </div>
  </div>
  </section>
</template>

<style lang="stylus" scoped>
.payment-view
  padding-top 0

.content
  position absolute
  width 100%

.subsection
  background-color #fff
  border-radius 2px
  margin 25px 0
  transition all .5s cubic-bezier(.55,0,.1,1)
  padding 10px 30px 10px 30px
  position relative
  line-height 20px
  .subsection-title
    margin 25px 10px
    font-size 26px
    font-weight 500
  .payment-paymentname
    margin auto
    font-size 24px
    font-weight 500
    color #707070
    z-index 999
  a
    text-decoration underline
  &:hover
    color #515ec4

</style>
