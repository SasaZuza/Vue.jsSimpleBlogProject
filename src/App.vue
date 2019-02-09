<template>
  <div>

    <!-- Nested this component into <div> -->
    <!--  
    <add-blog />
    -->

    <!-- Nested this component into <div> -->
    <!--  
    <show-blogs />
    -->

    <!-- Nested this component into <div> -->
    <!--  
    <list-blogs />
    -->

    <!-- We add app-header component to our app -->
    <app-header></app-header>

    <!-- When we add this tag is allows us to use routes we created before -->
    <!-- We can change the link of app and add path to desired route -->
    <router-view></router-view>
 
  </div>
</template>

<script>

// Importing components from folder
import addBlog from './components/addBlog.vue'
import showBlogs from './components/showBlogs.vue'
import listBlogs from './components/listBlogs.vue'
import header from './components/header.vue'

export default {

  components: {
    // Regisrating imported components
    'add-blog': addBlog,
    'show-blogs': showBlogs,
    'list-blogs': listBlogs,
    'app-header': header
  },

  data () {
    return {
     
    }
  },

  methods: {

  }
}
</script>

<style>

  body {
    margin: 0;
    font-family: 'Nunito SemiBold'
  }

</style>
