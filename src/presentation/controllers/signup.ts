import {SingUpHttpHttpRequest, SingUpHttpResponse} from '../protocols/http';
import MissingParamName from '../errors/missing-param-error';

export default class SignUpController {
  handle (_httpRequest: SingUpHttpHttpRequest): SingUpHttpResponse {

    // Validator
    switch(true){
      case !_httpRequest.body.name:
        return new SingUpHttpResponse(400, new MissingParamName('name'))
      case !_httpRequest.body.email:
        return new SingUpHttpResponse(400, new MissingParamName('email'))
    }

    return new SingUpHttpResponse(200, {createdAt: new Date(), message: "ok!"})
    
  }
}
