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

// FOR UpdateTodo END POINT
TodoServices.updateTodo = function (id: any): any {
  const token = localStorage.getItem("auth");
  return fetch({
    url: `/update-todo?id=${id}`,
    method: "put",
    headers: <any>{
      headers: {
        "public-request": "true",
        Authorization: `Bearer ${token}`,
      },
    },
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

export default TodoServices;
