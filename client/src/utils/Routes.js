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
      path: '/pending-requests',
      text: 'Pending Requests'
    },
    login: {
      path: '/login',
      text: 'Login'
    },
    leaveHistory: {
      path: '/leave-history',
      text: 'Leave History'
    },
    calendar: {
      path: '/calendar',
      text: 'Calendar'
    }
  },
  adminRoutes: {
    addUser: {
      path: '/add-user',
      text: 'Add A User'
    },
    manageTeam: {
      path: '/manage-team',
      text: 'Manage Team'
    },
    allTeams: {
      path: '/all-teams',
      text: 'Manage All Teams'
    },
    approval: {
      path: '/pending-approvals',
      text: 'Pending Approvals'
    },
    reports: {
      path: '/reports',
      text: 'Reports'
    }
  }
}

export default Routes
