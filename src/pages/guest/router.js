export default {
  path: '/',
  component: 'pages/guest/index',
  children: [
    {
      path: '/',
      component: 'pages/guest/login',
      options: {
        meta: {
          roles: '*',
        },
      },
    },
    {
      path: 'register',
      component: 'pages/guest/register',
      protected: false,
    },
    {
      path: 'login',
      component: 'pages/guest/login',
      protected: false,
    },
    // {
    //   path: 'reset-password',
    //   component: 'pages/guest/reset-password',
    //   protected: false,
    // },
    // {
    //   path: 'reset-password/:code',
    //   component: 'pages/guest/reset-password',
    //   protected: false,
    //   options: {
    //     props: true,
    //   },
    // },
    // {
    //   path: 'verify',
    //   component: 'pages/guest/verify',
    //   subdomain: true,
    // },
    // {
    //   path: 'change-password',
    //   component: 'pages/guest/change-password',
    //   protected: false,
    // },
  ],
};
