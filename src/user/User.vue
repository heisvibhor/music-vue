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
            <b-nav-item v-if="userType == 'USER'"><router-link to="/creatorprofile/new">Creator</router-link></b-nav-item>
            <!-- <b-nav-item v-if="userType == 'CREATOR'"><router-link to="/creatorprofile/edit">Creator</router-link></b-nav-item> -->
            <b-nav-item v-if="userType == 'CREATOR'"><router-link to="/creator">Creator</router-link></b-nav-item>
            <b-nav-item-dropdown text="Search" right>
              <b-dropdown-item><router-link to="/albumSearch">Album</router-link></b-dropdown-item>
              <b-dropdown-item><router-link to="/songsearch">Song</router-link></b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <template #button-content>
                User
              </template>
              <b-dropdown-item><router-link :to="{name: 'profile'}">Profile</router-link></b-dropdown-item>
              <b-dropdown-item><router-link to="/logout">Logout</router-link></b-dropdown-item>
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
  name: 'UserRoutes',
  data() {
    return {
      userType : this.$store.state.auth.user_type
    }
  },
}
</script>