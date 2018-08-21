const Routes = {
  primary: {
    home: {
      path: '/',
      text: 'Home'
    },
    admin: {
      path: '/admin',
      text: 'Admin'
    },
    requestLeave: {
      path: '/request-leave',
      text: 'Request Leave'
    },
    requestStatus: {
      path: '/request-status',
      text: 'Status'
    },
    login: {
      path: '/login',
      text: 'Login'
    },
    leaveHistory: {
      path: '/leave-history',
      text: 'Leave History'
    }
  },
  adminRoutes: {
    addUser: {
      path: '/add-user',
      text: 'Add A User'
    },
    allTeams: {
      path: '/all-teams',
      text: 'Manage Teams'
    },
    approval: {
      path: '/pending-approvals',
      text: 'Pending Approvals'
    }
  }
}

export default Routes
