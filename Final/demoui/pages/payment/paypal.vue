<template>
  <section class="payment-view">
    <div style="margin: 15px 15px;margin-bottom: 10%">
      Account balance: $100.00
    </div>
  <div class="content">
    <div class="subsection">
      <div style="margin: 15px 15px;font-size:20px;">
        Payment information
      </div>
    <form style="margin: 15px 15px;">
      <div style="margin: 10px 0 10px;">
        <input style="font-size: 18px" type="text" placeholder="Your name" :value="name" v-model="name"></input>
      </div>
      <div style="margin: 10px 0 10px;">
        <input style="font-size: 18px" type="text" placeholder="Amount to send" :value="amount" v-model="amount"></input>
      </div>
      <div style="margin: 10px 0;">
        <input style="font-size: 18px" type="text" placeholder="Recipient email" :value="recipient" v-model="recipient"></input>
      </div>
      <div style="margin: 10px 0;">
        <input style="font-size: 18px" type="text" placeholder="Personal message" :value="message" v-model="message"></input>
      </div>
    </form>
    <button type="button" class="button--grey" style="margin-left:20%;color: white;background-color: #d41d25;border-color:#d41d25" @click="submitInsert">Send Payment</button>
    </div>
  </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {

  data () {
    return {
      name: '',
      amount: '',
      recipient: '',
      message: ''
    }
  },

  methods: {
    submitInsert () {
      let self = this

      axios.post('/api/pay', {
        headers:
          {
            'Content-Type': 'application/json'
          },
        data:
          {
            name: self.name,
            amount: self.amount,
            recipient: self.recipient,
            message: self.message
          }})
        .then((res) => {
          // res.data should contain the url for redirecting... bad practice
          self.$nuxt.$router.replace({ path: res.data })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },

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
