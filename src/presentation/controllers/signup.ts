import {HttpRequest, HttpResponse, SingUpHttpHttpRequest, SingUpHttpResponse} from '../protocols/http';
import MissingParamName from '../errors/missing-param-error';
import {badRequest} from '../helpers/http-helper';
import MissingParamError from '../errors/missing-param-error';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import InvalidParamError from '../errors/invalid-param-error';
import ServerError from '../errors/server-error copy';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator){
    this.emailValidator = emailValidator;
  }

  handle (_httpRequest: HttpRequest): HttpResponse {
    try{
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

      for(const field of requiredFields){
        if(!_httpRequest.body[field]){
          return badRequest(new MissingParamError(field));
        }
      }
  
      const isValid = this.emailValidator.isValid(_httpRequest.body.email);
      if(!isValid){
        return badRequest(new InvalidParamError('email'));
      }
      
      return new SingUpHttpResponse(200, {createdAt: new Date(), message: "ok!"})
    }catch(error){
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }

    
  }
}
