import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/authentication/login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'registration',
        children: [
          {
            path: 'start',
            loadComponent: () => import('./pages/authentication/registration/start/start.page').then( m => m.StartPage)
          },
          {
            path: 'skills',
            loadComponent: () => import('./pages/authentication/registration/skills/skills.page').then( m => m.SkillsPage)
          },
          {
            path: 'complete',
            loadComponent: () => import('./pages/authentication/registration/complete/complete.page').then( m => m.CompletePage)
          },
          {
            path: '',
            redirectTo: 'start',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'requests',
    children: [
      {
        path: 'requests',
        loadComponent: () => import('./pages/requests/requests/requests.page').then( m => m.RequestsPage)
      },
      {
        path: 'request',
        children: [
          {
            path: 'details',
            loadComponent: () => import('./pages/requests/request/details/details.page').then( m => m.DetailsPage)
          },
          {
            path: 'active',
            loadComponent: () => import('./pages/requests/request/active/active.page').then( m => m.ActivePage)
          },
          {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'create',
        children: [
          {
            path: 'details',
            loadComponent: () => import('./pages/requests/create/details/details.page').then( m => m.DetailsPage)
          },
          {
            path: 'skills',
            loadComponent: () => import('./pages/requests/create/skills/skills.page').then( m => m.SkillsPage)
          },
          {
            path: 'complete',
            loadComponent: () => import('./pages/requests/create/complete/complete.page').then( m => m.CompletePage)
          },
          {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'requests',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'connections',
    children: [
      {
        path: 'search',
        loadComponent: () => import('./pages/connections/search/search.page').then( m => m.SearchPage)
      },
      {
        path: '',
        loadComponent: () => import('./pages/connections/connections/connections.page').then( m => m.ConnectionsPage)
      },
    ]
  },
  {
    path: 'profile',
    children: [
      {
        path: 'details',
        loadComponent: () => import('./pages/profile/details/details.page').then( m => m.DetailsPage)
      },
      {
        path: 'modify',
        loadComponent: () => import('./pages/profile/modify/modify.page').then( m => m.ModifyPage)
      },
      {
        path: 'password',
        children: [
          {
            path: 'authorization',
            loadComponent: () => import('./pages/profile/password/authorization/authorization.page').then( m => m.AuthorizationPage)
          },
          {
            path: 'change',
            loadComponent: () => import('./pages/profile/password/change/change.page').then( m => m.ChangePage)
          },
          {
            path: '',
            redirectTo: 'authorization',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'skills',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./pages/skills/list/list.page').then( m => m.ListPage)
      },
      {
        path: 'modify',
        loadComponent: () => import('./pages/skills/modify/modify.page').then( m => m.ModifyPage)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
];