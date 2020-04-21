import Page from '../components/client/Page'
let config = require('../config/index')

var routerMap = {
  mode: 'history',
  base: '/' + config.VIEW_NAME,
  routes: [
    {
      path: '/:uid',
      component: Page
    },
    {
      path: '/:projectKey/:uid',
      component: Page
    }
  ]
}
export default routerMap
