import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addNewPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, post) {
        const index = state.loadedPosts.findIndex(curr => post.id === curr.id);
        state.loadedPosts[index] = { id: post.id, ...post.data };
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(process.env.baseURL + '/posts.json').then(result => {
          const PostsArray = [];
          for (const key in result.data) {
            PostsArray.push({
              id: key,
              ...result.data[key]
            });
          }
          vuexContext.commit('setPosts', PostsArray);
        }).catch(error => {
          console.log(error);
        });
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      addNewPost(vuexContext, post) {
        return new Promise(resolve => {
          const updatedDate = new Date();
          axios.post(process.env.baseURL + '/posts.json', { ...post, updatedDate}).then(response => {
            resolve(vuexContext.commit('addNewPost', { ...post, id: response.data.name }));
          }).catch(error => {
            console.log(error);
          });
        })
      },
      editPost(vuexContext, post) {
        const updatedDate = new Date();
        const { postId, ...postInfo } = post;
        axios.put(`${process.env.baseURL}/posts/${postId}.json`, { ...postInfo, updatedDate}).then(response => {
          vuexContext.commit('editPost', { ...response, id: postId });
          this.$router.push('/admin');
        }).catch(error => {
          console.log(error);
        })
      }
    }
  })
};

export default createStore;
