'use strict';

/**
 * navigation service
 */
const { createCoreService } = require('@strapi/strapi').factories;

async function calculateUrl(slug, getParent) {
    let url = '';
    let temp = slug;
    let result;

    while ((result = await getParent(temp)) && result.results.length > 0) {
        url = `${result.results[0].slug}${url}`;
        temp = result.results[0].parentNavigation; // Update temp to the next parent navigation
    }

    return url;
}

module.exports = createCoreService('api::navigation.navigation', ({ strapi }) => ({
    async findNavigations(params) {
        let { results, pagination } = await strapi.service('api::navigation.navigation').find(params.query);

        const callback = async (slug) => {
            return await strapi.service('api::navigation.navigation').find({
                filters: { slug: `${slug}` }
            });
        };

        const data = await Promise.all(results.map(async (result) => {
            let url = await calculateUrl(result.parentNavigation, callback);
            return { ...result, url: `${url}${result.slug}` };
        }));

        return { data, pagination };
    }
}));
