const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-param-error");

const makeSut = () => {
  class AuthUseCaseSpy {
    auth(email,password) {
      this.email = email;
      this.password = password;      
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy();
  const sut = new LoginRouter(authUseCaseSpy);
  return { authUseCaseSpy, sut };
};

describe("Login Router", () => {
  test("Should return 400 if email is not provided", () => {
    const sut = makeSut().sut;
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
    const sut = makeSut().sut;
    const httpRequest = {
      body: {
        email: "gabriel123@gmail.com"
      }
    };
    const httpResponse = sut.route(httpRequest);
  });

  test("Should call AuthUseCase with correct params", () => {
    const {sut,authUseCaseSpy} = makeSut();
    const httpRequest = {
      body: {
        email: "gabriel123@gmail.com",
        password: "any_password"
      }
    };
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
  });
});
