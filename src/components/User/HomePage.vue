<template>
    <div class="banner-area">
      <header>
        <div class="menu">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Account</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </header>
      <div class="banner-text">
        <h1>Salon Info</h1>
        <p>
            Transform your beauty routine with seamless scheduling and exclusive offers from top salons. Enjoy expert services at your convenience  no waiting, just beauty on demand. Your perfect look is just a click away!
        </p>
        <a href="userlogin">Login</a>
        <a href="usersignup">Sign up</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage'
  };
  </script>
  
  <style scoped>
* {
  margin: 0;
  padding: 0;
}

.banner-area {
  background-image: url('../../assets/background2.jpg');
  background-position: center center;
  background-size: cover;
  height: 100vh;
  width: auto;
  margin: auto;
  position: relative; /* Make the banner area a positioned element */
}

.banner-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black filter with 50% opacity */
  backdrop-filter: blur(0px); /* Adjust the blur value as needed */
  z-index: 1; /* Ensure the filter is above the background image */
}

.menu {
  float: right;
  list-style: none;
  margin-top: 30px;
  position: relative;
  z-index: 2; /* Ensure menu is above the filter */
}

.menu ul li {
  display: inline-block;
}

.menu ul li a {
  color: #fff;
  text-decoration: none;
  padding: 5px 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

.menu ul li a:hover {
  color: rgb(199, 139, 255);

}

.banner-text {
  position: absolute;
  width: 600px;
  height: 300px;
  margin: 20% 30%;
  text-align: center;
  z-index: 2; /* Ensure text is above the filter */
}

.banner-text h1 {
  text-align: center;
  color: rgb(255,255,255);
  text-transform: uppercase;
  font-size: 60px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

.banner-text p {
  color: #fff;
  font-size: 18px;
}

.banner-text a {
  border: 1px solid #fff;
  padding: 10px 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 14px;
  margin-top: 20px;
  display: inline-block;
  color: #fff;
}

.banner-text a:hover {
  background-color: white;
  color: rgba(68, 25, 109, 0.623);
  font-weight: bold;
}
</style>
