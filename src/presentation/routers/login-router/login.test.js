class LoginRouter {
  route(httpRequest) {
    if (!httpRequest.body.email || !httpRequest.body.password) {
      return {
        statusCode: 400
      };
    }
  }
}

describe("Login Router", () => {
  test("Should return 400 if email is not provided", () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: "any password"
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should return 400 if password is not provided", () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email:"gabriel123@gmail.com"
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});



