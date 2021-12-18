import MissingParamError from "../errors/missing-param-error"
import {HttpRequest, HttpResponse} from "../protocols/http";
 
export const badRequest = (error: Error) => ({
    statusCode: 400,
    body: error
})