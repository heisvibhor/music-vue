<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link to="/creator/home">Home</router-link></b-nav-item>
            <b-nav-item></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item><router-link to="/home">User Home</router-link></b-nav-item>
            <b-nav-item-dropdown text="New" right>
              <b-dropdown-item><router-link to="/creator/song/new">Song</router-link></b-dropdown-item>
              <b-dropdown-item><router-link to="/creator/album/new">Album</router-link></b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <template #button-content>
                User
              </template>
              <b-dropdown-item><router-link to="/creatorprofile/edit">Profile</router-link></b-dropdown-item>
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
  name: 'CreatorRoutes',
  data() {
    return {
      userType : this.$store.state.auth.user_type
    }
  },
}
</script>