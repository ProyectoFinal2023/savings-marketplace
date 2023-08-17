type routeParams = {
  plans: {
    search?: string;
    page?: number;
    size?: number;
  };
};

export const routePaths = {
  plans: ({ search = "", page = 1, size = 3 }: routeParams["plans"]) =>
    `/plans?${new URLSearchParams({
      search,
      page: `${page}`,
      size: `${size}`,
    }).toString()}`,
};
