'use strict';

/**
 * navigation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::navigation.navigation',({strapi}) => ({
    
    async findNavigations(ctx){
        return strapi.service('api::navigation.navigation').findNavigations(ctx)
    }
}));
