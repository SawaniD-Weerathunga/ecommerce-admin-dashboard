const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const bcrypt = require('bcrypt');
const {sequelize, User, Category, Product, Order, OrderItem, Setting} = require('../models');
const { act } = require('react');
const { or } = require('sequelize');

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

const readOnlyForUserActions = {
    new: {isAccessible: canAdminAccess},
    edit: {isAccessible: canAdminAccess},
    delete: {isAccessible: canAdminAccess},
}

const setupAdmin = async(app) => {
    const admin = new AdminJS({
        databases: [sequelize],
        rootPath: '/admin',

        dashboard: {
            handler: async (request, response, context) => {
                const {currentAdmin} = context;

                if(currentAdmin && currentAdmin.role === 'admin'){
                    const usersCount = await User.count();
                    const productsCount = await Product.count();
                    const ordersCount = await Order.count();

                    return {
                        role: 'admin',
                        email: currentAdmin.email,
                        usersCount,
                        productsCount,
                        ordersCount
                    };
                }

                if (currentAdmin){
                    const userOrders = await Order.findAll({
                        where: {userId: currentAdmin.id},
                        limit: 5,
                        order: [['createdAt', 'DESC']],
                    });

                    return {
                        role: 'user',
                        email: currentAdmin.email,
                        orders: userOrders
                    };
                }

                return {role: 'guest'};
            },

            component: AdminJS.bundle('./components/Dashboard.jsx') 
        },

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
            
            {
                resource: Category,
                options: {actions: readOnlyForUserActions}
            },
            {
                resource: Product,
                options: {actions: readOnlyForUserActions}
            },
            {
                resource: Order,
                options: {actions: readOnlyForUserActions}
            },
            {
                resource: OrderItem,
                options: {actions: readOnlyForUserActions}
            },
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



