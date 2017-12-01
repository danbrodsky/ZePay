<template>
  <section class="payment-view">
          <div style="margin: 15px 15px;margin-bottom: 10%">
          Account balance: $100.00
        </div>
    <div class="content">
      <div class="subsection">
        <div class="subsection-title" style="text-align: center;margin-bottom: 10%">Select Payment Method</div>
        <div class="menu">
        <ul style="list-style-type: none; padding: 0; margin: 0;">
          <li>
          <img class="logo" src="~/assets/img/WeChat.png" alt="logo">
          </li>
          <li>
          <router-link to="/payment/paypal" exact>
          <img class="logo" src="~/assets/img/PayPal.png" alt="logo">
          </router-link>
          </li>
          <li>
          <img class="logo" src="~/assets/img/Alipay.png" alt="logo">
          </li>
          <li>
          <img class="logo" src="~/assets/img/Venmo.png" alt="logo">
          </li>
        </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: `ZePay`
    }
  }
}
</script>

<style lang="stylus" scoped>
.payment-view
  padding-top 0

.content
  position absolute
  width 100%

.subsection
  line-height 20px
  float left
  padding 15px
  .subsection-title
    font-size 26px
    font-weight 500
  .title
    font-size 18px
    font-weight 500
  .menu ul
    margin-top 50px
    list-style-type none
    margin 0
    padding 0
  .menu li
    margin auto
    width 80%
    padding 5%
    margin-bottom 7px
    color #ffffff
  a
    text-decoration underline
    &:hover
      color #515ec4

</style>