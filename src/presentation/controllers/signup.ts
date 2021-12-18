import {HttpRequest, HttpResponse, SingUpHttpHttpRequest, SingUpHttpResponse} from '../protocols/http';
import MissingParamName from '../errors/missing-param-error';
import {badRequest} from '../helpers/http-helper';
import MissingParamError from '../errors/missing-param-error';
import { Controller } from '../protocols/controller';

export default class SignUpController implements Controller {

  handle (_httpRequest: HttpRequest): HttpResponse {

    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

    for(const field of requiredFields){
      if(!_httpRequest.body[field]){
        return badRequest(new MissingParamError(field));
      }
    }

    return new SingUpHttpResponse(200, {createdAt: new Date(), message: "ok!"})
    
  }
}
