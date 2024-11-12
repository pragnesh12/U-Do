import fetch from "../interceptor/fetchInterceptor";

const TodoServices: Record<any, any> = {};

// For InsertTodo END POINT
TodoServices.insertTodo = function (data: any): Promise<any> {
  const token = localStorage.getItem("auth");
  console.log("");
  return fetch({
    url: `/myday-todo`,
    method: "post",
    headers: {
      "public-request": "true",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

// For InsertSubTodo END POINT
TodoServices.insertSubTodo = function (data: any): Promise<any> {
  const token = localStorage.getItem("auth");
  console.log("");
  return fetch({
    url: `/myday-subtodos`,
    method: "post",
    headers: {
      "public-request": "true",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

// FOR UpdateTodo END POINT
TodoServices.updateTodo = function (id: any, data: any): any {
  console.log("------------------->", data);
  const token = localStorage.getItem("auth");
  return fetch({
    url: `/update-todo?id=${id}`,
    method: "put",

    headers: {
      "public-request": "true",
      Authorization: `Bearer ${token}`,
    },

    data: data,
  });
};

// FOR SubTodo END POINT
TodoServices.updateSubTodo = function (id: any, data: any): any {
  const token = localStorage.getItem("auth");
  return fetch({
    url: `/update-sub-todo?id=${id}`,
    method: "put",
    headers: {
      "public-request": "true",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

// FOR FetchTodo END POINT
TodoServices.fetchTodo = async function (): Promise<any> {
  const token = localStorage.getItem("auth");

  return fetch(`/fetch-todo`, {
    method: "GET",
    headers: {
      "public-request": "true",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      return response;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

// FOR FetchTodo END POINT
TodoServices.fetchTodoById = async function (id: any): Promise<any> {
  const token = localStorage.getItem("auth");

  return fetch(`/myday/tasks?id=${id}`, {
    method: "GET",
    headers: {
      "public-request": "true",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      return response;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

export default TodoServices;
