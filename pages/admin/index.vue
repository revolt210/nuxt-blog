<template>
  <div class="admin-page">
    <section class="new-post">
      <button @click="$router.push('/admin/new-post')">Create Post</button>
      <button style="margin-left: 10px" @click="onLogout">Logout</button>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <posts-list :posts="posts" :isAdmin="true"></posts-list>
    </section>
  </div>
</template>

<script>
    import PostsList from "~/components/Posts/PostsList.vue";

    export default {
        layout: 'admin',
        middleware: ['check-auth', 'auth'],
        components: {
            PostsList
        },
        computed: {
            posts() {
                return this.$store.getters.loadedPosts;
            }
        },
        methods: {
            onLogout() {
                this.$store.dispatch('logout');
                this.$router.push('admin/auth');
            }
        }
    }
</script>

<style scoped>
  .admin-page {
    padding: 20px;
  }
  .new-post {
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }
  .existing-posts h1 {
    text-align: center;
  }
</style>
