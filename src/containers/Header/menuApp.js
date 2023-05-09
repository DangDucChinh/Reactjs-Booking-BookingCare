export const adminMenu = [
    { //Quản lí người dùng
        name: 'menu.admin.manage-user', menus: [
            { name: 'menu.admin.crud', link: "/system/user-manage" },
            { name: 'menu.admin.crud-redux', link: "/system/user-redux" },
            { name: 'menu.admin.manage-doctor', link: "/system/manage-doctor" },
            { name: 'menu.admin.manage-admin', link: "/system/user-admin" },
        ],
    },
    { //Quản lí phòng khám
        name: 'menu.admin.clinic', menus: [
            { name: 'menu.admin.manage-clinic', link: "/system/user-clicnic" }
        ],
    },
    { //Quản lí chuyên khoa
        name: 'menu.admin.specialty', menus: [
            { name: 'menu.admin.manage-specialty', link: "/system/user-specialty" }
        ],
    },
    { //Quản lí cẩm nang
        name: 'menu.admin.handbook', menus: [
            { name: 'menu.admin.manage-handbook', link: "/system/user-handbook" }
        ],
    }
];