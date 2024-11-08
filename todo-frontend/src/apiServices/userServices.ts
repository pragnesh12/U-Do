import fetch from "../interceptor/fetchInterceptor";

const JwtService: Record<any, any> = {};

// FOR REGISTER END POINT
JwtService.signup = function (data: any) {
  console.log("Data from register : ", data.profile_picture);
  if (data.profile_picture) {
    return fetch({
      url: "/signup",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
  } else {
    return fetch({
      url: "/signup",
      method: "post",
      data: data,
    });
  }
};

// FOR LOGIN END POINT
JwtService.login = function (data: any): any {
  return fetch({
    url: "/login",
    method: "post",
    headers: <any>{
      headers: {
        "public-request": "true",
      },
    },
    data: data,
  });
};

// FOR VerifyEmail END POINT
JwtService.verifyEmail = function (token: any): any {
  localStorage.setItem("auth", token);
  return fetch({
    url: `/verify_email?token=${token}`,
    method: "put",
    headers: <any>{
      headers: {
        "public-request": "true",
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

// FOR LOGIN END POINT
JwtService.getCurrentUser = function (): Promise<any> {
  const token = localStorage.getItem("auth");

  return fetch(`/get-user`, {
    method: "GET",
    headers: {
      "public-request": "true",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      console.log("yes", response);
      return response;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

export default JwtService;
