<template>

  <div id="add-blog">
      <h2> Add a new Blog Post </h2>
      
      <!-- Form for blog title and content -->
      <!-- We add 'v-if="!submited" to hide this form after it's submited  -->
      <form v-if="!submited">
          <!-- We bind data entered into input for adn save to this 'title property so it can be viewed in #preview <div>' -->
          <!-- 'lazy' option means that content will not be displayed automaticly a typing but when we leave that tag we are in currently -->
          <label> Blog Title: </label>
          <input type="text" v-model.lazy="blog.title" required>

          <!-- We use sam binding for content in textarea as for title in input form -->
          <!-- 'lazy' option means that content will not be displayed automaticly a typing but when we leave that tag we are in currently -->
          <label> Blog Content: </label>
          <textarea v-model.lazy="blog.content"></textarea>

          <!-- Adding checkboxes to blog -->
          <!-- For "v-model" we can add one property for all checkboxes - that is Vue.js feature -->
          <div id="checkboxes">
              <label>Ninjas</label>
              <input type="checkbox" value="ninjas" v-model="blog.categories">
              <label>Mario</label>
              <input type="checkbox" value="mario" v-model="blog.categories">
              <label>Wizards</label>
              <input type="checkbox" value="wizards" v-model="blog.categories">
              <label>Chesee</label>
              <input type="checkbox" value="chesee" v-model="blog.categories">
          </div>

          <!-- Adding select tag for authors -->
          <label>Author: </label>
          <!-- We are adding 'v-model' option to select tag and not to the option tag -->
          <!-- In <option> we use 'v-for' to cycle trought authors array and output selected author -->
          <select v-model="blog.author">
              <option v-bind:key="key" v-for="(author,key) in authors"> {{author}} </option>
          </select>

          <!-- Adding button with click event that will add blog and send some http: request -->
          <!-- 'prevent' is preventing default behaviour and stoping it to go from this page -->
          <button v-on:click.prevent="post"> Add Blog </button>

      </form>
      
      <!-- This <div> will be shown when form is submited -->
      <div v-if="submited">
          <h3>Thanks for adding your blog!</h3>
      </div>

      <!-- div for previewing of typed content  to see how it looks before saving to database -->
      <div id="preview">
          <h3> Blog Preview: </h3>
          <!-- Adding 'title' and 'content' from 'v-model' options from <form> -->
          <!-- Their function is to display content entered in <input> and <textarea>  -->
          <p>Blog Title: {{blog.title}} </p>

          <p>Blog Preview:</p>
          <p> {{blog.content}}  </p>

          <p>Blog Categories:</p>
            <ul>
                <!-- We use "v-for" to cycle trouht array in categoies and output checked category (checkbox) -->
                <li v-bind:key="key" v-for="(category,key) in blog.categories">{{ category }}</li>
            </ul> 
          
          <!-- Here we output for preview selected author -->
          <p>Author: {{blog.author}} </p>

      </div>

  </div>

</template>

<script>
export default {
  
  data () {
    return {
        // Adding this values as empty for beggining and before typing
        // We add them all to one object because they are related and for easyer access
        blog: {
            title: '',
            content: '',
            // There can be checked one or more categories so we add an array
            categories: [],
            author: ''
        },

        // Outside of blog object in data we declare authors as array of names that can be selected in <select>
        authors: ['Sasa', 'Jovana', 'Zorica'],

        // This property keeps track when form is submited and blog added (for start it's false because not submited)
        submited: false,
    }
  },

  methods: {
        // This method is for posting added data in some place (ex. database) 
        post: function() {
            // With this we refere to this component and with '$http' we are calling plugin 'VueResource'
            // 'post' defines our request and it's post that is related to 'JSON placeholder' site for fake API-s 
            // Earlier we used this JSONPlaceholder link: 'https://jsonplaceholder.typicode.com/posts'
            // Now we use link from Firebase database and add repository for storing - posts.json
            this.$http.post('https://vuenetninja.firebaseio.com/posts.json', 
                // Second parameter is object - content we want to send and we use format from 'JSON placeholder' site
                // Earlier with JSONPlaceholder we added body, title and id but for Firebase it's not needed
                // title: this.blog.title,
                // body: this.blog.content,
                // userId: 1
                // We also add 'then()' method that represents a promise - it will run some function after posting this data above
                // Now we also add whole blog object to database - Firebase
            this.blog).then(function(data){
                // In this case it will just console log data that is placed 
                console.log(data);
                // After we submit form we change 'submited' property to true
                this.submited = true;
            });
        }
  }
}
</script>

<style>
    #add-blog *{
        box-sizing: border-box;
    }
    #add-blog{
        margin: 20px auto;
        max-width: 500px;
    }
    label{
        display: block;
        margin: 20px 0 10px;
    }
    input[type="text"], textarea{
        display: block;
        width: 100%;
        padding: 8px;
    }
    #preview{
        padding: 10px 20px;
        border: 1px dotted #ccc;
        margin: 30px 0;
    }
    h3{
        margin-top: 10px;
    }
    #checkboxes input{
    display: inline-block;
    margin-right: 10px;
    }
    #checkboxes label{
        display: inline-block;
    }
  
</style>
