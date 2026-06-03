import { stringify } from "query-string";
import axiosInstance from "../utils/axios";

// axiosInstance already has baseURL="/api", so resource paths are relative (no /api prefix needed)
export const dataProvider = {
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    const params = {};

    // Pagination — Refine simple-rest format
    params._start = (current - 1) * pageSize;
    params._end = current * pageSize;

    // Sorting
    if (sorters && sorters.length > 0) {
      params._sort = sorters[0].field;
      params._order = sorters[0].order;
    }

    // Filters
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter.operator === "contains") {
          params.q = filter.value;
        } else {
          params[filter.field] = filter.value;
        }
      });
    }

    const { data, headers } = await axiosInstance.get(`/${resource}`, { params });

    const total = +headers["x-total-count"] || data.length;

    return { data, total };
  },

  getOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.get(`/${resource}/${id}`);
    return { data };
  },

  create: async ({ resource, variables }) => {
    const { data } = await axiosInstance.post(`/${resource}`, variables);
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const { data } = await axiosInstance.patch(`/${resource}/${id}`, variables);
    return { data };
  },

  deleteOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.delete(`/${resource}/${id}`);
    return { data };
  },

  getMany: async ({ resource, ids }) => {
    const results = await Promise.all(
      ids.map((id) => axiosInstance.get(`/${resource}/${id}`))
    );
    return { data: results.map((r) => r.data) };
  },

  getApiUrl: () => "/api",

  custom: async ({ url, method, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    const { data } = await axiosInstance({
      url: requestUrl,
      method,
      data: payload,
      headers,
    });

    return { data };
  },
};
