type routeParams = {
  plans: {
    search?: string;
    page?: number;
    size?: number;
  };
  planDetail: {
    id: string;
  }
};

export const routePaths = {
  plans: ({ search = "", page = 1, size = 3 }: routeParams["plans"]) =>
    `/plans?${new URLSearchParams({
      search,
      page: `${page}`,
      size: `${size}`,
    }).toString()}`,
  planDetail: ({ id }: routeParams["planDetail"]) =>
    `/plans/${id}`
};
