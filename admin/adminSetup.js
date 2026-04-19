const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const bcrypt = require('bcrypt');
const {sequelize, User, Category, Product, Order, OrderItem, Setting} = require('../models');

AdminJS.registerAdapter(AdminJSSequelize);

const canAdminAccess = ({currentAdmin}) => {
    return currentAdmin && currentAdmin.role === 'admin';
}

const adminOnlyActions = {
    list: {isAccessible: canAdminAccess},
    show: {isAccessible: canAdminAccess},
    new: {isAccessible: canAdminAccess},
    edit: {isAccessible: canAdminAccess},
    delete: {isAccessible: canAdminAccess},
}

const setupAdmin = async(app) => {
    const admin = new AdminJS({
        databases: [sequelize],
        rootPath: '/admin',
        resources: [
            {
                resource: User,
                options: {
                    actions: adminOnlyActions,
                    properties: {
                        password: {
                            isVisible: {list: false, show: false, edit: true, filter: false}
                        },
                        role: {isVisible: {list: true, filter: true, show: true, edit: canAdminAccess}}
                    }
                }
            },
            {
                resource: Setting,
                options: {
                    actions: adminOnlyActions,
                }   
            },
            Category,
            Product,
            Order,
            OrderItem,
        ],

        branding: {
            companyName: 'eCommerce Admin',
            softwareBrothers: false
        }
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin,{
        authenticate: async (email, password) => {
            const user = await User.findOne({where: {email}});
            if(user){
                const matched = await bcrypt.compare(password, user.password);
                if(matched){
                    return {id: user.id, email: user.email, role: user.role};
                }
            }
            return  false;
        },
        cookiePassword: 'some-super-secret-password-for-cookies',
    },null, {
        resave: false,
        saveUninitialized: true,
    });

    app.use(admin.options.rootPath, adminRouter);
};

module.exports = setupAdmin;



