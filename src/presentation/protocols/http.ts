export interface HttpResponse{
    statusCode: number,
    body: any
}

export interface HttpRequest {
    body?: any
}

export class SingUpHttpResponse implements HttpResponse{
    statusCode: number
    body: any

    constructor(statusCode: number, body: any) {
        this.statusCode = statusCode
        this.body = body
    }
}

export class SingUpHttpHttpRequest implements HttpRequest{
    body?: any
}