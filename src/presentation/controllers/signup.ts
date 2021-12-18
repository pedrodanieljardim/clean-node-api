import {SingUpHttpHttpRequest, SingUpHttpResponse} from '../protocols/http';
import MissingParamName from '../errors/missing-param-error';
import {badRequest} from '../helpers/http-helper';
import MissingParamError from '../errors/missing-param-error';

export default class SignUpController {
  handle (_httpRequest: SingUpHttpHttpRequest): SingUpHttpResponse {

    switch(true){
      case !_httpRequest.body.name:
        return badRequest(new MissingParamError('name'))
      case !_httpRequest.body.email:
        return badRequest(new MissingParamError('email'))
    }

    return new SingUpHttpResponse(200, {createdAt: new Date(), message: "ok!"})
    
  }
}
