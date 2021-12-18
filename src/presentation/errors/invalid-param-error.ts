export default class InvalidParamError extends Error {

    constructor(paramName: string){
        super(`Missing param: ${paramName}`);
        this.name = 'MissingParamError';
    }

}