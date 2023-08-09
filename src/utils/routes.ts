type routeParams = {
  plans: {
    search?: string;
  };
};

export const routePaths = {
  plans: ({ search = "" }: routeParams["plans"]) =>
    `/plans?${new URLSearchParams({ search }).toString()}`,
};
