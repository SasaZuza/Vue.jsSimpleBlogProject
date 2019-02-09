<template>

  <!-- Here we add some other custom directive -->
  <!-- After name of directive we add : and pass directive arguments -->
  <!-- Because it's a string we pass it in singe quotes '' -->
  <div v-theme:column="'narrow'" id="show-blogs">

      <h1>All Blog articles</h1>

      <!-- We create input field that will search some content in blogs -->
      <input type="text" v-model="search" placeholder="search blogs" />

      <!-- This is where we are outputing blog article that is added (every blog in separate div) -->
      <!-- We use 'v-for' to cycle trought all blog and display them -->
      <!-- We use 'filteredBlogs' property for that in which all geted and filtered blogs are stored -->
      <!-- For start filtered blogs are equal to all blogs because 'search' is an empty string -->
      <div v-bind:key="key" v-for="(blog,key) in filteredBlogs" class="single-blog"> 
        <!-- Here we call and dispaly some properties from geted data -->
        <!-- 'v-rainbow' is custom directive that we create and that will have funcionality that is not definef bu Vue so far -->
        <!-- ' | to-uppercase ' is way of creating filter in Vue (this will make <h2> tag to uppercase ) -->
        <!-- ' | snippet ' filter that will make text in body shorter by showing less caracters in it -->
        <!-- We used <route-link> and 'v-bind' to go to blog component and use id of that blog to display it -->
       <router-link v-bind:to="'/blog/' + blog.id"> 
            <h2 v-rainbow> {{blog.title | to-uppercase}} </h2> 
       </router-link>
        
        <!-- Before we used blog.body and now with firebase is like bellow -->
        <article> {{blog.content | snippet}} </article>     

      </div>

  </div>
</template>

<script>

// importing file in which mixin is stored
import searchMixin from '../mixins/searchMixin';


export default {
  
  data () {
    return {
        // We create this propery to store get requests from 'JSON placeholder' site
        blogs: [],
        // We create this property as empty string
        search: ''
    }
  },

  methods: {

  },
  
  // This is life-cycle hook that wil fire after component is created
  created() {
      // With this we refere to this component and with '$http' we are calling plugin 'VueResource'
      // 'get' defines our request and it's related to 'JSON placeholder' site for fake API-s
      // Earlyer we used this JSON Placeholder link to get data - https://jsonplaceholder.typicode.com/posts
      // Now we use our firebase database link to get data
      this.$http.get('https://vuenetninja.firebaseio.com/posts.json')
        // We also add 'then()' method that represents a promise - it will run some function after geting data from above
        .then(function(data){
            // In this case it will just console log data that is geted
            // console.log(data);

            // Here we return 'data.json()' that is making promise
            // It will add all blogs in single object like in JSON file  
            return data.json();

            // We use blogs property to store geted posts from 'JSON placeholder' site
            // We access body of array in 'JSON placeholder' link and show only 10 of 100 posts
            // When using Firebase we don't want to slice data 
            // this.blogs = data.body.slice(0,10);

      // Because of using 'data.json()' and 'then()' we return this bellow      
      }).then(function(data){

          // This is variable that will temperarely store blogs from database
          var blogsArray = []
          
          // For loop will loop though blogs and look fo Firebase unique key for every loop
          for(let key in data){
              // With this we add this unique key of post from firebase as id 
              data[key].id = key;
              // Then we push this data to temperarly array
              blogsArray.push(data[key]);
          }

          // When we output blogs array now those objects has property od id with Firebase keys as id
          // We declared that above in for loop
          // console.log(blogsArray);

          this.blogs = blogsArray;
      })
  },

  // Creating computed properties in here
  computed: {

      // We created this computed property as mixin in 'searchMixin.js' file
      /*
      // Computed property is 'filteredBlogs' that show some blogs depending on search options
      filteredBlogs: function() {
          // This cycles trough blogs and returns blogs that are filtered by search option
          return this.blogs.filter((blog) => {
              // It looks to blog title and looks search term in input field with match method
              // It uses 'search' data property as variable to look for searched word (term)
              return blog.title.match(this.search);
          })
      }
      */

  },

  // This is where we register our filters locally so only this component can use them
  filters: {
      // Way of registrating filter 'to-uppercase' locally (very similar to registrating globaly in 'main.js')
      'to-uppercase': function(value) {
          return value.toUpperCase();
      }

  },

  // This is how we can register directives locally
  directives: {
      'rainbow': {
          // This is function that fires as soon as as directive is hooked to element
          // It has 3 params: 
          // 1. 'el' it refers to element that is connected to (in this case <h2>)
          // 2. 'binding' it refers to data in directive (like data after v-rainbow="someData") 
          // 3. 'vnode' is virtual DOM node that is not very interesting in this case
          bind(el, binding, vnode) {
          // This is way of styling element and adding to it some random color
          // We use 'slice()' method to add 6 digit number after '#' for colors 
          el.style.color = "#" + Math.random().toString().slice(2,8);
          }
        }
  },

  // This is how we use created mixins - as array and by adding them
  mixins: [searchMixin]
}

</script>

<style>

    #show-blogs{
        max-width: 800px;
        margin: 0px auto;
    }

    .single-blog{
        padding: 20px;
        margin: 20px 0;
        box-sizing: border-box;
        background: #eee;
    }

</style>
