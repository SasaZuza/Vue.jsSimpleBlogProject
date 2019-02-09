// We need to import components that will be used in routes objects 
import showBlogs from './components/showBlogs.vue'
import addBlog from './components/addBlog.vue'
import singleBlog from './components/singleBlog.vue'

// In this file we register all our routes as array of routes
// Each object inside of array represents separate route
export default [
    // First parameter is path and second is name of component that will be shown  on that path (this is homepage)
    {path: '/', component: showBlogs},
    // First parameter is path and second is name of component that will be shown  on that path (this is addBlog)
    {path: '/add', component: addBlog},
    // We add this route with it's parameter (:id) that will load single blog by it's id in this component
    {path: '/blog/:id', component: singleBlog}
]
