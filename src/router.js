import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
        // manage instances and executions
        {
          name: 'Instances',
          path: 'components/instances',
          component: () => import('@/views/dashboard/main/InstanceMenu'),
        },
        // send instances
        {
          name: 'Load an instance',
          path: 'components/load-instance',
          component: () => import('@/views/dashboard/new/NewInstance'),
        },
        {
          name: 'Start an execution',
          path: 'components/start-execution',
          component: () => import('@/views/dashboard/new/NewExecution'),
        },
        {
          name: 'Show execution log',
          path: 'components/log-execution',
          component: () => import('@/views/dashboard/solution/ShowSolution'),
        },
        {
          name: 'User management',
          path: 'components/users',
          component: () => import('@/views/dashboard/users/AllUsers'),
        },
      ],
    },
  ],
})
