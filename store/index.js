import marked from 'marked'

export const state = () => ({
  drawerEnabled: false,
  showBody: false,
  isLoading: false,
  articles: [],
  article: {},
  locale: 'fr'
});

export const mutations = {
  TOGGLE_DRAWER: function (state, enabled = true) {
    state.drawerEnabled = enabled;
  },
  SHOW_BODY: function (state) {
    state.showBody = true
  },
  HIDE_BODY: function (state) {
    state.showBody = false
  },
  SET_ARTICLES: function (state, articles) {
    state.articles = articles
  },
  SET_ARTICLE: function (state, article) {
    state.article = article
  },
  TOGGLE_LOADING: function (state) {
    state.isLoading = !state.isLoading
  }
};

export const actions = {
  async fetchArticles (context, params) {
    context.commit('TOGGLE_LOADING');
    const data = await function () {
      return new Promise((resolve, reject) => {
        params.app.$axios.get(`/post?limit=${params.limit}&locale=${params.app.i18n.locale}`).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          console.log('err');
          console.log(err.request.url);
          console.log(err.request.headers);
          console.log(err.response.status);
          console.log(err.response.headers);
          reject(err)
        })
      })
      if (data.data == undefined) {
        console.log('Err fetching articles');
        context.commit('SET_ARTICLES', []);
      }
      context.commit('SET_ARTICLES', data.data.posts);
    }();
    context.commit('TOGGLE_LOADING');
  },
  async fetchArticle (context, params) {
    context.commit('TOGGLE_LOADING');
    const data = await function () {
      return new Promise((resolve) => {
        params.context.app.$axios.get(`/post/${params.slug}`).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          console.log('err');
          resolve(err.response.status)
        })
      })
    }();
    if (data === 404){
      params.context.error({statusCode: 404, message: 'Post not found'});
    } else {
      data.data.post.content = marked(data.data.post.content);
      context.commit('SET_ARTICLE', data.data.post);
      context.commit('TOGGLE_LOADING');
    }
  }
};
