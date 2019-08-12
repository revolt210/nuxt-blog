<template>
  <section class="posts-list">
<!--    <post-preview id="1" :is-admin="isAdmin" preview-text="Preview text 1" thumbnail="https://www.cg.nl/wp-content/uploads/2018/06/tech-header-01.jpg" title="Post Title 1"></post-preview>-->
    <post-preview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :is-admin="isAdmin"
      :preview-text="post.previewText"
      :thumbnail="post.thumbnail"
      :title="post.title"></post-preview>
  </section>
</template>

<script>
    import PostPreview from "~/components/Posts/PostPreview.vue";
    export default {
        props: {
          isAdmin: {
              type: Boolean,
              default: false
          },
          posts: {
              type: Array,
              required: true
          }
        },
        components: {
            PostPreview
        }
    }
</script>

<style scoped>
  .posts-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
