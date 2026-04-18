const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const {sequelize, User, Category, Product, Order, OrderItem, Setting} = require('../models');

AdminJS.registerAdapter(AdminJSSequelize);

const setupAdmin = async(app) => {
    const admin = new AdminJS({
        databases: [sequelize],
        rootPath: '/admin',
        resources: [
            {
                resource: User,
                options: {
                    properties: {
                        password: {isVisible: false}
                    }
                }
            },
            Category,
            Product,
            Order,
            OrderItem,
            Setting
        ],

        branding: {
            companyName: 'eCommerce Admin',
            softwareBrothers: false
        }
    });

    const adminRouter = AdminJSExpress.buildRouter(admin);

    app.use(admin.options.rootPath, adminRouter);
};

module.exports = setupAdmin;
