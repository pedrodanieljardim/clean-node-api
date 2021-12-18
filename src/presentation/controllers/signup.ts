import {SingUpHttpHttpRequest, SingUpHttpResponse} from '../protocols/http';
import MissingParamName from '../errors/missing-param-error';
import {badRequest} from '../helpers/http-helper';
import MissingParamError from '../errors/missing-param-error';

export default class SignUpController {
  handle (_httpRequest: SingUpHttpHttpRequest): SingUpHttpResponse {
    const requiredFields = ['name', 'email', 'password'];

    for(const field of requiredFields){
      if(!_httpRequest.body[field]){
        return badRequest(new MissingParamError(field));
      }
    }

    return new SingUpHttpResponse(200, {createdAt: new Date(), message: "ok!"})
    
  }
}
