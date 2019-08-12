import Vuex from 'vuex';
import axios from 'axios';
import Cookie from'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
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
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
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
          axios.post(process.env.baseURL + '/posts.json?auth=' + vuexContext.state.token, { ...post, updatedDate}).then(response => {
            resolve(vuexContext.commit('addNewPost', { ...post, id: response.data.name }));
          }).catch(error => {
            console.log(error);
          });
        })
      },
      editPost(vuexContext, post) {
        const updatedDate = new Date();
        const { postId, ...postInfo } = post;
        axios.put(`${process.env.baseURL}/posts/${postId}.json?auth=${vuexContext.state.token}`, { ...postInfo, updatedDate}).then(response => {
          vuexContext.commit('editPost', { ...response, id: postId });
          this.$router.push('/admin');
        }).catch(error => {
          console.log(error);
        })
      },
      authenticateUser(vuexContext, authData) {
        let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey;
        if(!authData.isLogin) {
          authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey;
        }
        return this.$axios.$post(authURL , {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }).then(response => {
          vuexContext.commit('setToken', response.idToken);
          localStorage.setItem('token', response.idToken);
          localStorage.setItem('tokenExpiration', new Date().getTime + Number.parseInt(response.expiresIn * 1000));
          Cookie.set('jwt', response.idToken);
          Cookie.set('expirationDate', new Date().getTime + Number.parseInt(response.expiresIn * 1000));
          return this.$axios.$post('http://localhost:3000/api/track-data', {
            data: 'Authenticated'
          });
        });
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() =>  {
          vuexContext.commit('clearToken');
        }, duration)
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if(req) {
          if(!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
          if(!jwtCookie) {
            return;
          }
          token = jwtCookie.split('=')[1];
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1];
        } else if(process.client) {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration');
        } else {
          token = null;
          expirationDate = null;
        }
        if(new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token');
          vuexContext.dispatch('logout');
          return;
        }
        vuexContext.commit('setToken', token);
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        if(process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }
      }
    }
  })
};

export default createStore;
