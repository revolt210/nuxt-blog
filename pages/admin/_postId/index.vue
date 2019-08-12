<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" @submit="onSubmitted"></admin-post-form>
    </section>
  </div>
</template>

<script>
    import axios from 'axios';
    import AdminPostForm from "~/components/Admin/AdminPostForm";
    export default {
        layout: 'admin',
        middleware: ['check-auth', 'auth'],
        components: { AdminPostForm },
        asyncData(context) {
            return axios.get(`https://fir-b9e79.firebaseio.com/posts/${context.params.postId}.json`).then(response => {
                return {
                    loadedPost: response.data
                }
            }).catch(error => {
                console.log(error);
            });
        },
        methods: {
            onSubmitted(post) {
                this.$store.dispatch('editPost', { ...post, postId: this.$route.params.postId });
            }
        }
    }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }
  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>
