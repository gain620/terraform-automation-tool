export default {
  // home is a section without childs, set as an empty array
  home: [],

  products: [
    {
      type: "title",
      txt: "vSphere Automation",
      // icon: 'fa fa-tag context-menu__title-icon',
      icon: "fa fa-window-restore"
    },

    {
      type: "link",
      txt: "Create new VMs",
      link: "/page"
    },

    {
      type: "link",
      txt: "Designer",
      link: "/page"
    },

    {
      type: "link",
      txt: "Show all VMs",
      link: "/page"
    },

    {
      type: "link",
      txt: "Edit networks",
      link: "/page"
    },

    {
      type: "link",
      txt: "Edit VMs",
      link: "/page"
    }
  ],

  vCD: [
    {
      type: "title",
      txt: "vCD Automation",
      // icon: 'fa fa-tag context-menu__title-icon',
      icon: "fa fa-window-restore"
    },

    {
      type: "link",
      txt: "Create new VMs",
      link: "/page"
    },

    {
      type: "link",
      txt: "Show all VMs",
      link: "/page"
    },

    {
      type: "link",
      txt: "Edit networks",
      link: "/page"
    },

    {
      type: "link",
      txt: "Edit VMs",
      link: "/page"
    }
  ],

  customers: [
    {
      type: "title",
      txt: "vCAV Automation",
      icon: "fa fa-cloud"
    },

    {
      type: "link",
      txt: "New Migration",
      link: "/page"
    },

    {
      type: "link",
      txt: "New Protection",
      link: "/page"
    }
  ],

  account: [
    {
      type: "title",
      txt: "My Account",
      icon: "fa fa-user context-menu__title-icon"
    },

    {
      type: "link",
      txt: "Change Password",
      link: "/page"
    },

    {
      type: "link",
      txt: "Change Settings",
      link: "/page"
    },

    {
      type: "link",
      txt: "Logout",
      link: "/page"
    }

    // {
    //   type: 'title',
    //   txt: 'Change Subscription',
    //   icon: 'fa fa-credit-card context-menu__title-icon',
    // },

    // {
    //   type: 'link',
    //   txt: 'Plans',
    //   link: '/page',
    // },

    // {
    //   type: 'link',
    //   txt: 'Payment Settings',
    //   link: '/page',
    // },

    // {
    //   type: 'link',
    //   txt: 'Payment History',
    //   link: '/page',
    // },
  ]
};
