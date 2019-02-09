// In this file we export default objects
// We will create mixin that will use sintax for search blogs options 
// this is defined before in 'showBlogs.vue' and 'listBlogs.vue' in computed properties as 'filteredBlogs'
export default {

    // We also use in this file computed options
    computed: {
        // Computed property is 'filteredBlogs' that show some blogs depending on search options
        filteredBlogs: function() {
        // This cycles trough blogs and returns blogs that are filtered by search option
        return this.blogs.filter((blog) => {
            // It looks to blog title and looks search term in input field with match method
            // It uses 'search' data property as variable to look for searched word (term)
            return blog.title.match(this.search);
        })
    }
    }

}