"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    constructor(res) {
        this.res = res;
    }
    success(dataOrMessage = null, messageOrCode, maybeCode) {
        let data = null;
        let message = 'Success';
        let code = 200;
        if (typeof dataOrMessage === 'string') {
            message = dataOrMessage;
        }
        else {
            data = dataOrMessage;
            if (typeof messageOrCode === 'string') {
                message = messageOrCode;
            }
        }
        if (typeof messageOrCode === 'number') {
            code = messageOrCode;
        }
        else if (typeof maybeCode === 'number') {
            code = maybeCode;
        }
        const response = {
            status: true,
            message,
        };
        if (data !== null && data !== undefined) {
            response.data = data;
        }
        return this.res.status(code).json(response);
    }
    error(message = 'Something went wrong', code = 500, errors = null) {
        return this.res.status(code).json({
            status: false,
            message,
            errors,
        });
    }
}
exports.default = HttpResponse;
