import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./authentication/login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'registration',
        children: [
          {
            path: 'start',
            loadComponent: () => import('./authentication/registration/start/start.page').then( m => m.StartPage)
          },
          {
            path: 'skills',
            loadComponent: () => import('./authentication/registration/skills/skills.page').then( m => m.SkillsPage)
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
        loadComponent: () => import('./requests/requests/requests.page').then( m => m.RequestsPage)
      },
      {
        path: 'request',
        loadComponent: () => import('./requests/request/request.page').then( m => m.RequestPage)
      },
      {
        path: 'create',
        children: [
          {
            path: 'details',
            loadComponent: () => import('./requests/create/details/details.page').then( m => m.DetailsPage)
          },
          {
            path: 'skills',
            loadComponent: () => import('./requests/create/skills/skills.page').then( m => m.SkillsPage)
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
        loadComponent: () => import('./connections/search/search.page').then( m => m.SearchPage)
      },
      {
        path: '',
        loadComponent: () => import('./connections/connections.page').then( m => m.ConnectionsPage)
      },
    ]
  },
  {
    path: 'profile',
    children: [
      {
        path: 'details',
        loadComponent: () => import('./profile/details/details.page').then( m => m.DetailsPage)
      },
      {
        path: 'modify',
        loadComponent: () => import('./profile/modify/modify.page').then( m => m.ModifyPage)
      },
      {
        path: 'password',
        children: [
          {
            path: 'authorization',
            loadComponent: () => import('./profile/password/authorization/authorization.page').then( m => m.AuthorizationPage)
          },
          {
            path: 'change',
            loadComponent: () => import('./profile/password/change/change.page').then( m => m.ChangePage)
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
        loadComponent: () => import('./skills/list/list.page').then( m => m.ListPage)
      },
      {
        path: 'modify',
        loadComponent: () => import('./skills/modify/modify.page').then( m => m.ModifyPage)
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
  }
]
/*
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./authentication/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'start',
    loadComponent: () => import('./authentication/registration/start/start.page').then( m => m.StartPage)
  },
  {
    path: 'skills',
    loadComponent: () => import('./authentication/registration/skills/skills.page').then( m => m.SkillsPage)
  },
  {
    path: 'requests',
    loadComponent: () => import('./requests/requests/requests.page').then( m => m.RequestsPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./requests/requests/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'active',
    loadComponent: () => import('./requests/requests/active/active.page').then( m => m.ActivePage)
  },
  {
    path: 'request',
    loadComponent: () => import('./requests/request/request.page').then( m => m.RequestPage)
  },
  {
    path: 'details',
    loadComponent: () => import('./requests/request/details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'messages',
    loadComponent: () => import('./requests/request/messages/messages.page').then( m => m.MessagesPage)
  },
  {
    path: 'finalize',
    loadComponent: () => import('./requests/request/finalize/finalize.page').then( m => m.FinalizePage)
  },
  {
    path: 'details',
    loadComponent: () => import('./requests/create/details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'skills',
    loadComponent: () => import('./requests/create/skills/skills.page').then( m => m.SkillsPage)
  },
  {
    path: 'connections',
    loadComponent: () => import('./connections/connections.page').then( m => m.ConnectionsPage)
  },
  {
    path: 'connections',
    loadComponent: () => import('./connections/connections/connections.page').then( m => m.ConnectionsPage)
  },
  {
    path: 'pending',
    loadComponent: () => import('./connections/pending/pending.page').then( m => m.PendingPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./connections/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'details',
    loadComponent: () => import('./profile/details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'modify',
    loadComponent: () => import('./profile/modify/modify.page').then( m => m.ModifyPage)
  },
  {
    path: 'authorization',
    loadComponent: () => import('./profile/password/authorization/authorization.page').then( m => m.AuthorizationPage)
  },
  {
    path: 'change',
    loadComponent: () => import('./profile/password/change/change.page').then( m => m.ChangePage)
  },
  {
    path: 'list',
    loadComponent: () => import('./skills/list/list.page').then( m => m.ListPage)
  },
  {
    path: 'modify',
    loadComponent: () => import('./skills/modify/modify.page').then( m => m.ModifyPage)
  },
];
*/