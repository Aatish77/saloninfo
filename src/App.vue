<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
 /* .slideshow {
    margin-top: 0px;
   
    width: 100%;
    height: 510px;
    overflow: hidden;
    box-shadow: black 5px;
  }
  .login {
    margin-top: 50px;
    width: 300px !important;
  
   background-color: rgba(255, 255, 255, 0);
    border-radius: 5%;
    color: rgb(255, 255, 255);
  } */
  /* .slideshow img {
    margin-top:5px;
    margin-left:5px;
    margin-right: 5px ;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: black 5px;
  } */
.bgimage{
  position: relative;
  width: 100%;
  height: 100vh;
  
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: linear-gradient(225deg, rgba(195, 195, 195, 0.04) 0%, rgba(195, 195, 195, 0.04) 25%,rgba(234, 234, 234, 0.04) 25%, rgba(234, 234, 234, 0.04) 50%,rgba(107, 107, 107, 0.04) 50%, rgba(107, 107, 107, 0.04) 75%,rgba(132, 132, 132, 0.04) 75%, rgba(132, 132, 132, 0.04) 100%),linear-gradient(65deg, rgba(116, 116, 116, 0.04) 0%, rgba(116, 116, 116, 0.04) 25%,rgba(219, 219, 219, 0.04) 25%, rgba(219, 219, 219, 0.04) 50%,rgba(33, 33, 33, 0.04) 50%, rgba(33, 33, 33, 0.04) 75%,rgba(165, 165, 165, 0.04) 75%, rgba(165, 165, 165, 0.04) 100%),linear-gradient(251deg, rgba(38, 38, 38, 0.04) 0%, rgba(38, 38, 38, 0.04) 25%,rgba(223, 223, 223, 0.04) 25%, rgba(223, 223, 223, 0.04) 50%,rgba(35, 35, 35, 0.04) 50%, rgba(35, 35, 35, 0.04) 75%,rgba(203, 203, 203, 0.04) 75%, rgba(203, 203, 203, 0.04) 100%),linear-gradient(236deg, rgba(206, 206, 206, 0.04) 0%, rgba(206, 206, 206, 0.04) 25%,rgba(13, 13, 13, 0.04) 25%, rgba(13, 13, 13, 0.04) 50%,rgba(151, 151, 151, 0.04) 50%, rgba(151, 151, 151, 0.04) 75%,rgba(255, 255, 255, 0.04) 75%, rgba(255, 255, 255, 0.04) 100%),linear-gradient(260deg, rgba(133, 133, 133, 0.04) 0%, rgba(133, 133, 133, 0.04) 25%,rgba(169, 169, 169, 0.04) 25%, rgba(169, 169, 169, 0.04) 50%,rgba(91, 91, 91, 0.04) 50%, rgba(91, 91, 91, 0.04) 75%,rgba(74, 74, 74, 0.04) 75%, rgba(74, 74, 74, 0.04) 100%),linear-gradient(90deg, rgb(8, 35, 191),rgb(1,66,124)); */
  /* background-image: linear-gradient(52deg, rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%,rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%,rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%),linear-gradient(258deg, rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%,rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%,rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%),linear-gradient(129deg, rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%,rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%,rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%),linear-gradient(280deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%,rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%,rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%),linear-gradient(85deg, rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%,rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%,rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%),linear-gradient(128deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%,rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%,rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.89999999999999%),linear-gradient(323deg, rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%,rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%,rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.89999999999999%),linear-gradient(61deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%,rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%,rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%),linear-gradient(0deg, rgb(0,0,0),rgb(0,0,0)); */
  /* background-image: linear-gradient(224deg, rgba(63, 63, 63, 0.1) 0%, rgba(63, 63, 63, 0.1) 50%,rgba(155, 155, 155, 0.1) 50%, rgba(155, 155, 155, 0.1) 100%),linear-gradient(89deg, rgba(75, 75, 75, 0.02) 0%, rgba(75, 75, 75, 0.02) 50%,rgba(99, 99, 99, 0.02) 50%, rgba(99, 99, 99, 0.02) 100%),linear-gradient(151deg, rgba(14, 14, 14, 0.02) 0%, rgba(14, 14, 14, 0.02) 50%,rgba(74, 74, 74, 0.02) 50%, rgba(74, 74, 74, 0.02) 100%),linear-gradient(7deg, rgba(31, 31, 31, 0.04) 0%, rgba(31, 31, 31, 0.04) 50%,rgba(210, 210, 210, 0.04) 50%, rgba(210, 210, 210, 0.04) 100%),linear-gradient(291deg, rgba(153, 153, 153, 0.07) 0%, rgba(153, 153, 153, 0.07) 50%,rgba(32, 32, 32, 0.07) 50%, rgba(32, 32, 32, 0.07) 100%),linear-gradient(90deg, rgb(4, 164, 188),rgb(9, 51, 170)); */
  background-image: url('https://4kwallpapers.com/images/walls/thumbs_3t/10974.jpg');
}
body{
   background-color: rgb(11, 11, 11) !important;
  font-family : 'Roboto', sans-serif !important;}
</style>
