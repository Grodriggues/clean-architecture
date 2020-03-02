const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-param-error");

const makeSut = () =>{
  return new LoginRouter();
}


describe("Login Router", () => {
  test("Should return 400 if email is not provided", () => {
    const sut = makeSut()
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
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: "gabriel123@gmail.com"
      }
    };
    const httpResponse = sut.route(httpRequest);
  });
});
