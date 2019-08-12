<template>
  <div class="posts-page">
    <posts-list :posts="posts"></posts-list>
  </div>
</template>

<script>
    import PostsList from "~/components/Posts/PostsList.vue";

    export default {
        components: {
            PostsList
        },
        // asyncData(context) {
        //     return new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve({
        //                 posts: [
        //                     { isAdmin: false, id: 1, previewText: 'Preview text 1', thumbnail: 'https://www.cg.nl/wp-content/uploads/2018/06/tech-header-01.jpg', title: 'Post Title 1' },
        //                     { isAdmin: false, id: 2, previewText: 'Preview text 2', thumbnail: 'https://www.cg.nl/wp-content/uploads/2018/06/tech-header-01.jpg', title: 'Post Title 2' },
        //                     { isAdmin: false, id: 3, previewText: 'Preview text 3', thumbnail: 'https://www.cg.nl/wp-content/uploads/2018/06/tech-header-01.jpg', title: 'Post Title 3' }
        //                 ]
        //             });
        //         }, 1000);
        //     }).then(data => {
        //         context.store.commit('setPosts', data.posts);
        //         return data;
        //     });
        // },
        // fetch(context) {
        //     return new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve({
        //                 posts: [
        //                     { isAdmin: false, id: 1, previewText: 'Preview text 1', thumbnail: 'https://www.cg.nl/wp-content/uploads/2018/06/tech-header-01.jpg', title: 'Post Title 1' },
        //                     { isAdmin: false, id: 2, previewText: 'Preview text 2', thumbnail: 'https://www.cg.nl/wp-content/uploads/2018/06/tech-header-01.jpg', title: 'Post Title 2' },
        //                     { isAdmin: false, id: 3, previewText: 'Preview text 3', thumbnail: 'https://www.cg.nl/wp-content/uploads/2018/06/tech-header-01.jpg', title: 'Post Title 3' }
        //                 ]
        //             });
        //         }, 1000);
        //     }).then(data => {
        //         context.store.commit('setPosts', data.posts);
        //     });
        // },
        computed: {
            posts() {
                return this.$store.getters.loadedPosts;
            }
        },
        head: {
            title: 'Web Development Blog'
        }
    }
</script>



<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
