import Vue from 'vue'
import App from './App.vue'
// Importing installed plugin for making 'http:' requests
// Instaling on npm: 'npm install vue-resource --save'  
import VueResource from 'vue-resource'
// Importing instaled plugin for creating routing in Vue
// Instalin on npm: 'npm install vue-router --save'
import VueRouter from 'vue-router'
// importing file where our routes are created and stored (so we can register them)
import Routes from './routes'


// Telling Vue.js that we want to use those plugins
Vue.use(VueResource);
Vue.use(VueRouter)

// To start using 'router' we need to create new instance like bellow
// This instance have object in which routes are stored - we will add them in separate file (routes.js)
const router = new VueRouter({
  // Property 'routes' is equal to 'Routes' from imported file
  routes: Routes,
  // This allows us to don't add that '#' simbol in url when seting routs paths
  mode: 'history'
});


// Creating custom directive (globaly so every component can use them)
// First parameter is name of directive and second is object that defines funcionality of directive
/*
Vue.directive('rainbow', {
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
});
*/

// Creating another custom directive
// The same procedure of seting directive as above (name and bind function with parameters) 
Vue.directive('theme', {
  bind(el, binding, vnode) {
    // Here we define condition - if costum directive data is equal to something (in this case 'wide' string)
    if (binding.value == 'wide') {
      // If condition is met then we style this element like this
      el.style.maxWidth = "1200px";
      // We can add also another condition with other styling options
    } else if (binding.value == 'narrow') {
        el.style.maxWidth = "560px";
    }
    // We can also inspect some arguments and if they are existing do some styling
    if (binding.arg == 'column') {
      el.style.background = "#ddd";
      el.style.padding = '20px';
    }
  }
});


// The way of registrating filter globaly so we can use it in all components
// First parameter is filter name defined in 'showBlogs.vue' file 
// Secon parameter is function with 'value' parameter (it represents the data where filter is used - in this case it's 'blog.title')
/*
Vue.filter('to-uppercase', function(value){
  // Here it takes value (in this case 'blog.title') and returns it uppercase
  return value.toUpperCase();
});
*/


// The way of registrating filter globaly so we can use it in all components
// Filter for shorter text in body
Vue.filter('snippet', function(value){
  // We use 'slice()' method to make this body text to show with 100 characters 
  return value.slice(0,100) + '...';
});


new Vue({
  el: '#app',
  render: h => h(App),
  // This is how we say that we want to use router in our app
  router: router
})
