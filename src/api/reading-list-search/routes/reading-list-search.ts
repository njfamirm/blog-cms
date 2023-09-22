export default {
  routes: [
    {
      method: "GET",
      path: "/reading-list-search",
      handler: "reading-list-search.search",
      config: {
        policies: [],
      },
    },
  ],
};
