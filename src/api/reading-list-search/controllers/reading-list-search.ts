async function search(ctx) {
  try {
    return await strapi.service('api::reading-list-search.reading-list-search').search(ctx.request.query.keyword);
  } catch (err) {
    ctx.badRequest('Reading list search controller error', {detail: err});
  }
}

export default {search};
