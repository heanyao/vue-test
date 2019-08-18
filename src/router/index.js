import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import CompanyVote from '@/components/companyVote'
import IntroduceCom from '@/components/introduceCom'
import AnalystVote from '@/components/analystVote'
import AnalystInfo from '@/components/analystInfo'
import NoFind from '@/components/noFind'
import ArticleDetail from '@/components/articleDetail'
import WinPrize from '@/components/winPrize'
import AnalystTypeList from '@/components/analystTypeList'
import CompanyTypeList from '@/components/companyTypeList'
import UserInfo from '@/components/userInfo'
// import Empty from '@/components/empty'
import Evaluate from '@/components/evaluate'
import hTcomSet from '@/components/admin/adminIndex'
import hTcomlist from '@/components/admin/hTcompanyList'
import hTcomdetail from '@/components/admin/hTcompanyDetail'

Vue.use(Router)

export default new Router({
 // mode: 'history',
  routes: [
   {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
	      keepAlive: true // 需要被缓存
	    }
   },
   {
      path: '/Login',
      name: 'Login',
      component: Login
   },
   {
      path: '/Evaluate',
      name: 'Evaluate',
      component: Evaluate
   },
  //  {
  //    path: '/Empty',
  //    name: 'Empty',
  //    component: Empty
  //  },
   {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
   },
   {
      path: '/AnalystTypeList',
      name: 'AnalystTypeList',
      component: AnalystTypeList
   },
   {
      path: '/CompanyTypeList',
      name: 'CompanyTypeList',
      component: CompanyTypeList
   },
   {
      path: '/CompanyVote/:id',
      name: 'CompanyVote',
      component: CompanyVote
   },
   {
      path: '/IntroduceCom/:id',
      name: 'IntroduceCom',
      component: IntroduceCom
   },
   {
      path: '/ArticleDetail/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
   },
   {
      path: '/AnalystVotes/',
      name: 'AnalystVotes',
      component: AnalystVote,
      children: [
        {
          path:'/AnalystVotes/:id',
          name: 'AnalystVote',
          component: AnalystVote,
        }
      ]
   },
   {
      path: '/AnalystInfo/:id',
      name: 'AnalystInfo',
      component: AnalystInfo
   },
   {
      path: '/WinPrize',
      name: 'WinPrize',
      component: WinPrize
   },
   {
      path: '/admin',
      name: 'adminComSet',
      component: hTcomSet
   },
   {
      path: '/admin-company-list',
      name: 'adminComList',
      component: hTcomlist
   },
   {
      path: '/admin-company-detail',
      name: 'adminComSetDetails',
      component: hTcomdetail,
      children: [
        {
          path: '/admin-company-detail/:id',
	      name: 'adminComSetDetail',
	      component: hTcomdetail
        }
       ]
   },
  {
      path: '*',
      name: 'noFind',
      component: NoFind
   },
  ]
})