
import fetch from '../fetch';

export const todoReq = {
  create: async (data: any) => {
    const res = await fetch.post(`/todo-items`, data);
    return res;
  },

  update: async (id: string, payload: any) => {
    const res = await fetch.patch(`/todo-items/${id}`, payload);
    return res;
  },

  delete: async (data: any) => {
    const res = await fetch.delete(`/todo-items/${data}`);
    return res;
  }
}
