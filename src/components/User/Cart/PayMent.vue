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
      razorPayScript: null
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
    },
    removeRazorPayScript() {
      // Remove the Razorpay script element from the DOM
      if (this.razorpayScript && this.razorpayScript.parentNode) {
        this.razorpayScript.parentNode.removeChild(this.razorpayScript);
        const elementsToRemove = document.body.getElementsByClassName('razorpay-container');

        // Convert HTMLCollection to array and loop through each element to remove it
        Array.from(elementsToRemove).forEach(element => {
          element.remove();
        });
      }
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
      // image: require("@/assets/Logo.jpg"),
      handler: async (response) => {
        this.pay_id = response.razorpay_payment_id;
        this.order_id = response.razorpay_order_id;
        this.signature = response.razorpay_signature;
        this.$store.commit('setPayment', this.pay_id)
        console.log("pay :",this.pay_id,"orderid:",this.order_id,"signature:",this.signature);
        try {
          const response1 = await this.$store.dispatch("addRazorPayment", {
            "orderId": this.order_id,
            "paymentId": this.pay_id,
            "signature": this.signature,
          });

          if (response1.status === 200) {
            this.$router.push('/viewparlours')
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
    paymentObject.on('payment.failed', (response) => {
      console.log('Payment failed event triggered');
      console.log('Response:', response);

      const proceed = confirm(`${response.error.description}. Do you want to proceed to another payment method?`);
      console.log('Proceed:', proceed);

      if (!proceed) {
        this.proceed = 'You are being redirected to home page.'
        this.overlay = true;
        paymentObject.close();
        setTimeout(() => {
          sessionStorage.clear();
          this.removeRazorPayScript(); 
          this.$router.push('/');
        }, 3000);
      }
    });
    paymentObject.open();
  },
  beforeUnmount() {
    this.removeRazorPayScript();
  } 
   
  }

</script>

