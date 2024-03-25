<template>
    <div>
      <div>
        <b-navbar toggleable="lg" type="light" variant="light">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item><router-link to="/home">Home</router-link></b-nav-item>
              <b-nav-item></b-nav-item>
            </b-navbar-nav>
  
            <b-navbar-nav class="ml-auto">
              <b-nav-item><router-link to="creator">Creator</router-link></b-nav-item>
              <b-nav-item-dropdown text="Search" right>
                <b-dropdown-item>Album</b-dropdown-item>
                <b-dropdown-item>Song</b-dropdown-item>
                
              </b-nav-item-dropdown>
  
              <b-nav-item-dropdown right>
                <template #button-content>
                  User
                </template>
                <b-dropdown-item><router-link to="profile"><span>Profile</span></router-link></b-dropdown-item>
                <b-dropdown-item><router-link to="creator">Logout</router-link></b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <router-view></router-view>
    </div>
  </template>
  <script>
  
  export default {
    name: 'HomeView',
  }
  </script>w