<template>
  <div>
    <aside class="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left" id="show-side-navigation1">
      <i class="uil-bars close-aside d-md-none d-lg-none" @click="toggleSidebar"></i>
      <div class="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
        <img class="rounded-pill img-fluid" width="65" :src="user.image" alt="">
        <div class="ms-2">
          <h5 class="fs-6 mb-0">
            <a class="text-decoration-none" href="#">{{ user.name }}</a>
          </h5>
          <p class="mt-1 mb-0">{{ user.description }}</p>
        </div>
      </div>

      <div class="search position-relative text-center px-4 py-3 mt-2">
        <input type="text" class="form-control w-100 border-0 bg-transparent" placeholder="Search here" v-model="searchQuery">
        <i class="fa fa-search position-absolute d-block fs-6"></i>
      </div>

      <ul class="categories list-unstyled">
        <li v-for="category in categories" :key="category.name" :class="{ 'has-dropdown': category.subcategories.length }">
          <i :class="category.icon"></i><a href="#">{{ category.name }}</a>
          <ul v-if="category.subcategories.length" class="sidebar-dropdown list-unstyled">
            <li v-for="subcategory in category.subcategories" :key="subcategory"><a href="#">{{ subcategory }}</a></li>
          </ul>
        </li>
      </ul>
    </aside>

    <section id="wrapper">
      <nav class="navbar navbar-expand-md">
        <div class="container-fluid mx-2">
          <div class="navbar-header">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle-navbar" aria-controls="toggle-navbar" aria-expanded="false" aria-label="Toggle navigation">
              <i class="uil-bars text-white"></i>
            </button>
            <a class="navbar-brand" href="#">admin<span class="main-color">kit</span></a>
          </div>
          <div class="collapse navbar-collapse" id="toggle-navbar">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Settings
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">My account</a></li>
                  <li><a class="dropdown-item" href="#">My inbox</a></li>
                  <li><a class="dropdown-item" href="#">Help</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Log out</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><i class="uil-comments-alt"></i><span>23</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><i class="uil-bell"></i><span>98</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i @click="toggleSidebar" class="uil-bars show-side-btn"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="p-4">
        <div class="welcome">
          <div class="content rounded-3 p-3">
            <h1 class="fs-3">Welcome to Dashboard</h1>
            <p class="mb-0">Hello {{ user.name }}, welcome to your awesome dashboard!</p>
          </div>
        </div>

        <section class="statistics mt-4">
          <div class="row">
            <div class="col-lg-4" v-for="stat in statistics" :key="stat.title">
              <div :class="`box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3 bg-${stat.color}`">
                <i :class="stat.icon"></i>
                <div class="ms-3">
                  <div class="d-flex align-items-center">
                    <h3 class="mb-0">{{ stat.value }}</h3> <span class="d-block ms-2">{{ stat.title }}</span>
                  </div>
                  <p class="fs-normal mb-0">{{ stat.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="charts mt-4">
          <div class="row">
            <div class="col-lg-6" v-for="chart in charts" :key="chart.id">
              <div class="chart-container rounded-2 p-3">
                <h3 class="fs-6 mb-3">{{ chart.title }}</h3>
                <canvas :id="chart.id"></canvas>
              </div>
            </div>
          </div>
        </section>

        <section class="admins mt-4">
          <div class="row">
            <div class="col-md-6" v-for="adminGroup in adminGroups" :key="adminGroup.type">
              <div class="box">
                <div v-for="admin in adminGroup.admins" :key="admin.name" class="admin d-flex align-items-center rounded-2 p-3 mb-4">
                  <div class="img">
                    <img class="img-fluid rounded-pill" width="75" height="75" :src="admin.image" alt="admin">
                  </div>
                  <div class="ms-3">
                    <h3 class="fs-5 mb-1">{{ admin.name }}</h3>
                    <p class="mb-0">{{ admin.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="statis mt-4 text-center">
          <div class="row">
            <div class="col-md-6 col-lg-3 mb-4 mb-lg-0" v-for="statis in statisList" :key="statis.title">
              <div :class="`box bg-${statis.color} p-3`">
                <i :class="statis.icon"></i>
                <h3>{{ statis.value }}</h3>
                <p class="lead">{{ statis.title }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="charts mt-4">
          <div class="chart-container p-3">
            <h3 class="fs-6 mb-3">{{ thirdChart.title }}</h3>
            <div style="height: 300px">
              <canvas :id="thirdChart.id" width="100%"></canvas>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "Jone Doe",
        image: "https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance",
        description: "Lorem ipsum dolor sit amet consectetur."
      },
      searchQuery: "",
      categories: [
        {
          name: "Dashboard",
          icon: "uil-estate fa-fw",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        },
        { name: "File manager", icon: "uil-folder", subcategories: [] },
        {
          name: "Calendar",
          icon: "uil-calendar-alt",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        },
        {
          name: "Mailbox",
          icon: "uil-envelope-download fa-fw",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        },
        {
          name: "Ecommerce",
          icon: "uil-shopping-cart-alt",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        },
        {
          name: "Projects",
          icon: "uil-bag",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        },
        {
          name: "Settings",
          icon: "uil-setting",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        },
        {
          name: "Components",
          icon: "uil-chart-pie-alt",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        },
        {
          name: "Charts",
          icon: "uil-chart-line",
          subcategories: ["Lorem ipsum", "ipsum dolor", "dolor ipsum", "amet consectetur", "ipsum dolor sit"]
        }
      ],
      statistics: [
        {
          title: "Traffic",
          value: "340,129",
          description: "Lorem ipsum dolor sit amet consectetur.",
          color: "success",
          icon: "uil-envelope-shield fs-2 text-dark"
        },
        {
          title: "Sales",
          value: "384,098",
          description: "Lorem ipsum dolor sit amet consectetur.",
          color: "danger",
          icon: "uil-file fs-2 text-dark"
        },
        {
          title: "Earnings",
          value: "23,323",
          description: "Lorem ipsum dolor sit amet consectetur.",
          color: "primary",
          icon: "uil-users-alt fs-2 text-dark"
        }
      ],
      charts: [
        { id: "chart1", title: "Chart title number one" },
        { id: "chart2", title: "Chart title number two" }
      ],
      adminGroups: [
        {
          type: "admin1",
          admins: [
            {
              name: "Dwayne Johnson",
              image: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png",
              description: "Lorem ipsum dolor sit amet consectetur"
            },
            {
              name: "Jone Doe",
              image: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png",
              description: "Lorem ipsum dolor sit amet consectetur"
            }
          ]
        },
        {
          type: "admin2",
          admins: [
            {
              name: "Brian Cox",
              image: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png",
              description: "Lorem ipsum dolor sit amet consectetur"
            },
            {
              name: "Jone Doe",
              image: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png",
              description: "Lorem ipsum dolor sit amet consectetur"
            }
          ]
        }
      ],
      statisList: [
        {
          title: "Total Sales",
          value: "65,650",
          color: "primary",
          icon: "uil-shopping-cart fs-2"
        },
        {
          title: "New Orders",
          value: "32,604",
          color: "danger",
          icon: "uil-shopping-cart fs-2"
        },
        {
          title: "Products",
          value: "3455",
          color: "success",
          icon: "uil-estate fs-2"
        },
        {
          title: "Category",
          value: "22,000",
          color: "info",
          icon: "uil-chart fs-2"
        }
      ],
      thirdChart: {
        id: "chart3",
        title: "Chart title number three"
      }
    }
  },
  methods: {
    toggleSidebar() {
      document.getElementById('show-side-navigation1').classList.toggle('show-side-nav');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

:root {
  --dk-gray-100: #F3F4F6;
  --dk-gray-200: #E5E7EB;
  --dk-gray-300: #D1D5DB;
  --dk-gray-400: #9CA3AF;
  --dk-gray-500: #6B7280;
  --dk-gray-600: #4B5563;
  --dk-gray-700: #374151;
  --dk-gray-800: #1F2937;
  --dk-gray-900: #111827;
  --dk-dark-bg: #313348;
  --dk-darker-bg: #2a2b3d;
  --navbar-bg-color: #6f6486;
  --sidebar-bg-color: #252636;
  --sidebar-width: 250px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--dk-darker-bg);
  font-size: .925rem;
}

#wrapper {
  margin-left: var(--sidebar-width);
  transition: all .3s ease-in-out;
}

#wrapper.fullwidth {
  margin-left: 0;
}

/** --------------------------------
 -- Sidebar
-------------------------------- */
.sidebar {
  background-color: var(--sidebar-bg-color);
  width: var(--sidebar-width);
  transition: all .3s ease-in-out;
  transform: translateX(0);
  z-index: 9999999
}

.sidebar .close-aside {
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  color: #EEE;
}

.sidebar .sidebar-header {
  border-bottom: 1px solid #2a2b3c
}

.sidebar .sidebar-header h5 a {
  color: var(--dk-gray-300)
}

.sidebar .sidebar-header p {
  color: var(--dk-gray-400);
  font-size: .825rem;
}

.sidebar .search .form-control ~ i {
  color: #2b2f3a;
  right: 40px;
  top: 22px;
}

.sidebar > ul > li {
  padding: .7rem 1.75rem;
}

.sidebar ul > li > a {
  color: var(--dk-gray-400);
  text-decoration: none;
}

/* Start numbers */
.sidebar ul > li > a > .num {
  line-height: 0;
  border-radius: 3px;
  font-size: 14px;
  padding: 0px 5px
}

.sidebar ul > li > i {
  font-size: 18px;
  margin-right: .7rem;
  color: var(--dk-gray-500);
}

.sidebar ul > li.has-dropdown > a:after {
  content: '\eb3a';
  font-family: unicons-line;
  font-size: 1rem;
  line-height: 1.8;
  float: right;
  color: var(--dk-gray-500);
  transition: all .3s ease-in-out;
}

.sidebar ul .opened > a:after {
  transform: rotate(-90deg);
}

/* Start dropdown menu */
.sidebar ul .sidebar-dropdown {
  padding-top: 10px;
  padding-left: 30px;
  display: none;
}
.sidebar ul .sidebar-dropdown.active {
  display: block;
}

.sidebar ul .sidebar-dropdown > li > a {
  font-size: .85rem;
  padding: .5rem 0;
  display: block;
}
/* End dropdown menu */

.show-sidebar {
  transform: translateX(-270px);
}

@media (max-width: 767px) {
  .sidebar ul > li {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .sidebar .search {
    padding: 10px 0 10px 30px
  }
}

/** --------------------------------
 -- welcome
-------------------------------- */
.welcome {
  color: var(--dk-gray-300);
}

.welcome .content {
  background-color: var(--dk-dark-bg);
}

.welcome p {
  color: var(--dk-gray-400);
}

/** --------------------------------
 -- Statistics
-------------------------------- */
.statistics {
  color: var(--dk-gray-200);
}

.statistics .box {
  background-color: var(--dk-dark-bg);
}

.statistics .box i {
  width: 60px;
  height: 60px;
  line-height: 60px;
}

.statistics .box p {
  color: var(--dk-gray-400);
}

/** --------------------------------
 -- Charts
-------------------------------- */
.charts .chart-container {
  background-color: var(--dk-dark-bg);
}

.charts .chart-container h3 {
  color: var(--dk-gray-400)
}

/** --------------------------------
 -- users
-------------------------------- */
.admins .box .admin {
  background-color: var(--dk-dark-bg);
}

.admins .box h3 {
  color: var(--dk-gray-300);
}

.admins .box p {
  color: var(--dk-gray-400)
}

/** --------------------------------
 -- statis
-------------------------------- */
.statis {
  color: var(--dk-gray-100);
}

.statis .box {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.statis .box h3:after {
  content: "";
  height: 2px;
  width: 70%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.12);
  display: block;
  margin-top: 10px;
}

.statis .box i {
  position: absolute;
  height: 70px;
  width: 70px;
  font-size: 22px;
  padding: 15px;
  top: -25px;
  left: -25px;
  background-color: rgba(255, 255, 255, 0.15);
  line-height: 60px;
  text-align: right;
  border-radius: 50%;
}

.main-color {
  color: #ffc107
}

/** --------------------------------
 -- Please don't do that in real-world projects!
 -- overwrite Bootstrap variables instead.
-------------------------------- */

.navbar {
  background-color: var(--navbar-bg-color) !important;
  border: none !important;
}
.navbar .dropdown-menu {
  right: auto !important;
  left: 0 !important;
}
.navbar .navbar-nav>li>a {
  color: #EEE !important;
  line-height: 55px !important;
  padding: 0 10px !important;
}
.navbar .navbar-brand {color:#FFF !important}
.navbar .navbar-nav>li>a:focus,
.navbar .navbar-nav>li>a:hover {color: #EEE !important}

.navbar .navbar-nav>.open>a,
.navbar .navbar-nav>.open>a:focus,
.navbar .navbar-nav>.open>a:hover {background-color: transparent !important; color: #FFF !important}

.navbar .navbar-brand {line-height: 55px !important; padding: 0 !important}
.navbar .navbar-brand:focus,
.navbar .navbar-brand:hover {color: #FFF !important}
.navbar>.container .navbar-brand, .navbar>.container-fluid .navbar-brand {margin: 0 !important}
@media (max-width: 767px) {
  .navbar>.container-fluid .navbar-brand {
    margin-left: 15px !important;
  }
  .navbar .navbar-nav>li>a {
    padding-left: 0 !important;
  }
  .navbar-nav {
    margin: 0 !important;
  }
  .navbar .navbar-collapse,
  .navbar .navbar-form {
    border: none !important;
  }
}

.navbar .navbar-nav>li>a {
  float: left !important;
}
.navbar .navbar-nav>li>a>span:not(.caret) {
  background-color: #e74c3c !important;
  border-radius: 50% !important;
  height: 25px !important;
  width: 25px !important;
  padding: 2px !important;
  font-size: 11px !important;
  position: relative !important;
  top: -10px !important;
  right: 5px !important
}
.dropdown-menu>li>a {
  padding-top: 5px !important;
  padding-right: 5px !important;
}
.navbar .navbar-nav>li>a>i {
  font-size: 18px !important;
}

/* Start media query */

@media (max-width: 767px) {
  #wrapper {
    margin: 0 !important
  }
  .statistics .box {
    margin-bottom: 25px !important;
  }
  .navbar .navbar-nav .open .dropdown-menu>li>a {
    color: #CCC !important
  }
  .navbar .navbar-nav .open .dropdown-menu>li>a:hover {
    color: #FFF !important
  }
  .navbar .navbar-toggle{
    border:none !important;
    color: #EEE !important;
    font-size: 18px !important;
  }
  .navbar .navbar-toggle:focus, .navbar .navbar-toggle:hover {background-color: transparent !important}
}

::-webkit-scrollbar {
  background: transparent;
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #3c3f58;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
