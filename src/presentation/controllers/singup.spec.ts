import SignUpController from './signup'
import MissingParamName from '../errors/missing-param-error';
import InvalidParamError from '../errors/invalid-param-error';
import ServerError from '../errors/server-error';
import { EmailValidator } from '../protocols/email-validator';


interface SutTypes {
  sut: SignUpController,
  emailValidatorStub: EmailValidator
}


const makeSut = (): SutTypes => {

  class EmailValidadorStub implements EmailValidator{
    isValid(email: string): boolean {
      return true;
    }

  }
  const emailValidatorStub = new EmailValidadorStub()
  const sut = new SignUpController(emailValidatorStub);

  return {sut, emailValidatorStub}
}

describe('SignUp Controller', () => {

  test('Should return 400 if no name is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const {sut} = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('email'))
  })
  
  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const {sut} = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const {sut, emailValidatorStub} = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const {sut, emailValidatorStub} = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)


    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }

    sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return 500 if EmailValidator throws', () => {
    class EmailValidadorStub implements EmailValidator{
      isValid(email: string): boolean {
        throw new Error();
      }
  
    }
    const emailValidatorStub = new EmailValidadorStub()
    const sut = new SignUpController(emailValidatorStub);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })


})
