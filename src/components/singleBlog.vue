<template>

    <!-- This is where single blog will be shown depending on it's route parameter by it's id -->
    <div id="single-blog">
        <!-- We use this tags to add title of blog and it's content -->
        <h1> {{blog.title}} </h1>

        <!-- Before we used blog.body and now with firebase is like bellow -->
        <article> {{blog.content}} </article>

        <!-- We output author of the blog -->
        <p>Author: {{blog.author}} </p>

        <!-- Output category of blog -->
        <ul>
            <li v-bind:key="key" v-for="(category,key) in blog.categories"> {{category}} </li>
        </ul>

    </div>

</template>

<script>
export default {
    
    data() {
        return {
            // Here we store id of blog 
            // We access route with '$route' and then 'params' and after that add name of route property in 'route.js' file
            id: this.$route.params.id,
            // Here we store data about blog (title, content...)
            blog: {}
        }
    },

    // This is life-cycle hook that triggers after createing component
    created() {
        // With this we refere to this component and with '$http' we are calling plugin 'VueResource'
        // 'get' defines our request and it's related to 'JSON placeholder' site for fake API-s
        // 'this.id' do geting more precisely by geting 'id' of post like in 'data'
        // Earlyer we used this JSON Placeholder link to get data - https://jsonplaceholder.typicode.com/posts 
        this.$http.get('https://vuenetninja.firebaseio.com/posts/' + this.id + '.json').then(function(data){
                // console.log(data);
                // We add content from blog file into 'blog' object created in data

                // Here we return 'data.json()' that is making promise
                // It will add all blogs in single object like in JSON file  
                return data.json();

                // We used this before with JSONPlaceholder
                // this.blog = data.body;

            // Because of using 'data.json()' and 'then()' we return this bellow     
            }).then(function(data){
                // In 'blog' object we return data that is passed in Firebase as blog on that id 
                this.blog = data;
            })
    }
}

</script>

<style>

    #single-blog{
        max-width: 960px;
        margin: 0 auto;
    }

</style>


