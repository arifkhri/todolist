import req from '../fetch';

export const activityReq = {
  getList: async (qParam?: any) => {
    return req.get("/activity-groups", qParam);
  },

  getDetail: async (id: string) => {
    return req.get(`/activity-groups/${id}`);
  },

  create: async (payload: any) => {
    return req.post("/activity-groups", payload);
  },

  update: async (id: string, payload: any) => {
    return req.patch(`/activity-groups/${id}`, payload);
  },

  delete: async (id: number) => {
    return req.delete(`/activity-groups/${id}`);
  },
}