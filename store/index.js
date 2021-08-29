import marked from 'marked'
import Moment from 'moment'

export const state = () => ({
  drawerEnabled: false,
  showBody: false,
  isLoading: false,
  articles: [],
  article: { title: '', image: '', created_at: '', content: '' },
  pagination: {
    current_page: 1,
    total_page: 0,
    previous_page: null,
    next_page: null
  },
  locale: 'fr',
  headerComplete: true,
  onSwappedLocale: null,
  swapLocale: null
});

export const mutations = {
  TOGGLE_DRAWER: function (state, enabled = null) {
    state.drawerEnabled = enabled === null ? !state.drawerEnabled : enabled;
  },
  SET_HEADER_COMPLETE: function (state, enabled) {
    state.headerComplete = enabled
  },
  SHOW_BODY: function (state) {
    state.showBody = true
  },
  HIDE_BODY: function (state) {
    state.showBody = false
  },
  SET_PAGINATION: function (state, pagination) {
    state.pagination = pagination
  },
  SET_ARTICLES: function (state, articles) {
    state.articles = articles
  },
  SET_ARTICLE: function (state, article) {
    state.article = article
  },
  TOGGLE_LOADING: function (state, payload) {
    if (payload != null) {
      state.isLoading = payload
    } else {
      state.isLoading = !state.isLoading
    }
  },
  SET_ON_SWAPPED_LOCALE: function (state, payload) {
    state.onSwappedLocale = payload
  },
  SET_SWAP_LOCALE: function (state, payload) {
    state.swapLocale = payload
  }
};

export const actions = {
  async fetchArticles (context, params) {
    context.commit('TOGGLE_LOADING', true);
    context.commit('SET_ARTICLES', []);
    context.commit('SET_PAGINATION', {
      current_page: 1,
      total_page: 0,
      previous_page: null,
      next_page: null
    });
    const data = await function () {
      return new Promise((resolve, reject) => {
        let query = ''
        if (params.per_page != null) {
          query += '&per_page=' + params.per_page
        } else {
          query += '&per_page=12'
        }
        if (params.page != null) {
          query += '&page=' + params.page
        }
        if (params.year != null) {
          query += '&year=' + params.year
        }
        let locale = ''
        if (params.app.i18n !== undefined) {
          locale = params.app.i18n.locale
        } else {
          locale = params.app.$i18n.locale
        }
        params.app.$axios.get(`/post?locale=${locale}${query}`).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          console.log('err');
          console.log(err.request);
          console.log('---');
          console.log(err.request.getHeaders());
          console.log(err.response.status);
          console.log(err.response.headers);
          reject(err)
        })
      });
    }();
    if (data.data === undefined) {
      console.log('Err fetching articles');
      context.commit('SET_ARTICLES', []);
    }

    // mark the first post as NEW only if there were created less than 3 weeks ago
    if (data.data.posts.length > 0) {
      let first = data.data.posts[0]
      let diff = Moment().diff(Moment(first.created_at)) // duration in milliseconds
      data.data.posts[0].isRecent = Moment.duration(diff).asWeeks() < 3
    }
    
    context.commit('SET_ARTICLES', data.data.posts);
    context.commit('SET_PAGINATION', data.data.pagination);
    context.commit('TOGGLE_LOADING');
  },
  async fetchArticle (context, params) {
    context.commit('SET_ARTICLE', { title: '', image: '', created_at: '', content: '' });
    context.commit('TOGGLE_LOADING', true);
    const data = await function () {
      return new Promise((resolve) => {
        params.context.app.$axios.get(`/post/${params.slug}`)
          .then(({ data }) => resolve(data))
          .catch((err) => {
            // console.log(err.response.status)
            // console.log(err.response.data)
            // console.log(params.slug)
            // console.log('err');
            resolve(err.response.status)
          })
      })
    }();
    if (data === 404){
      params.context.error({statusCode: 404, message: 'Post not found'});
    } else {
      // parse the date and replace with a formated date
      Moment.locale(params.context.app.i18n.locale || params.context.app.$i18n.locale)
    
      data.data.post.created_at = Moment(data.data.post.created_at).format('Do MMMM YYYY')

      // parse markdown
      data.data.post.content = marked(data.data.post.content)

      // image ?
      data.data.post.image = data.data.post.image.replace('50.', '75.')
      //data.data.post.image = data.data.post.image.replace('75.', 'original.')

      data.data.post.cover_position = 'background-position: center;'
      if (data.data.post.cover_offset != null && data.data.post.cover_offset.length > 1) {
        data.data.post.cover_position = 'background-position: ' + data.data.post.cover_offset + ';'
      }

      if (data.data.post.cover_mode === 'large') {
        data.data.post.image = data.data.post.image.replace('75.', 'original.')
      }

      // replace src="" attribute in img tags by data-src="" attributes to do lazy loading
      const regex = /<img[a-zA-Z0-9-;:"= ]+(src="(\S+)")/gm;
      let m = "";
      let results = [];
      while ((m = regex.exec(data.data.post.content)) !== null) {
        if (m.index === regex.lastIndex) { regex.lastIndex++; }
        results.push(m)
      }
      results.forEach((r) => {
        let a = r[1].replace('src="', 'data-src="')
        data.data.post.content = data.data.post.content.replace(r[1], a)
      })
      // Limitation due to the vue-lazyload lib: image that are not fully in the browser page frame are not loaded 
      // this can be a issue

      context.commit('SET_ARTICLE', data.data.post);
      context.commit('TOGGLE_LOADING');
    }
  }
};
