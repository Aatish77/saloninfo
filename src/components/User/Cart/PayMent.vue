<template>
  <h1>pay</h1>
</template>

<script>
export default {
  props: ['order_details', 'customer_details'],
  data(){
    return{
      script: `https://checkout.razorpay.com/v1/checkout.js`,
      order_id: null,
      signature: null,
      pay_id: null,
    }
  },
  methods :{ 
    async loadRazorPay(){
      return new Promise(resolve=>{
        const script = document.createElement('script')
        script.src = this.script
        script.onload = () =>{
          resolve(true)
        }
        script.onerror = () =>{
          resolve(false)
        }        
        document.body.appendChild(script)
      })      
    }
  },
  async created(){
    const result = await this.loadRazorPay()
    if(!result){
      alert('Failed to load razorpay script')
      return
    }

    const options = {
      key: this.$store.getters["getRazorDetails"].key,
      amount: this.$store.getters["getRazorDetails"].amount,
      currency:this.$store.getters["getRazorDetails"].currency ,
      name: `SalonInfo`,
      description: `Description of the payment`,
      order_id: this.$store.getters["getRazorDetails"].orderId,
      image: require("@/assets/Logo.jpg"),
      handler: async (response) => {
        this.pay_id = response.razorpay_payment_id;
        this.order_id = response.razorpay_order_id;
        this.signature = response.razorpay_signature;
        this.$store.commit('setPayment', this.pay_id)
        // console.log(this.pay_id);
        try {
          const response1 = await await this.$store.dispatch("addRazorPayment", {
            "orderId": this.order_id,
            "paymentId": this.pay_id,
            "signature": this.signature,
          });

          if (response1.status === 200) {
            this.$router.push('/loading_ticket')
          }
        }
        catch (error) {
          console.error(error);
        }
      },

      prefill: {
        name: `Your customer name`,
        email: `Your customer email`,
        contact: `9800445500`,
      },
      "theme":{
        "color": "#00006f"
      }
    }; 
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
}
</script>

<style>
.a{
  color:#00006f
}
</style>