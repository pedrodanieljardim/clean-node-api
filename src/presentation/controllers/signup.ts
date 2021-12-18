import {SingUpHttpHttpRequest, SingUpHttpResponse} from '../protocols/http';

export default class SignUpController {
  handle (_httpRequest: SingUpHttpHttpRequest): SingUpHttpResponse {

    // Validator
    switch(true){
      case !_httpRequest.body.name:
        return new SingUpHttpResponse(400, new Error('Missing param: name'))
      case !_httpRequest.body.email:
        return new SingUpHttpResponse(400, new Error('Missing param: email'))
    }

    return new SingUpHttpResponse(200, {createdAt: new Date(), message: "ok!"})
    
  }
}
