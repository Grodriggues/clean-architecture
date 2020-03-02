const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-param-error");

class LoginRouter {
  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.badRequest();
    }
    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return HttpResponse.badRequest("email");
    }
  }
}

class MissingParamError extends Error {
  constructor(paramName) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
  }
}

class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    };
  }

  static serverError() {
    return {
      statusCode: 500
    };
  }
}

describe("Login Router", () => {
  test("Should return 400 if email is not provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "any password"
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if password is not provided", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "gabriel123@gmail.com"
      }
    };
    const httpResponse = sut.route(httpRequest);
  });
});
