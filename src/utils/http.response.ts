// src/utils/HttpResponder.ts
import { Response } from 'express';

class HttpResponse {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    public success(dataOrMessage: any = null, messageOrCode?: string | number, maybeCode?: number) {
        let data: any = null;
        let message: string = 'Success';
        let code: number = 200;

        if (typeof dataOrMessage === 'string') {
            message = dataOrMessage;
        } else {
            data = dataOrMessage;
            if (typeof messageOrCode === 'string') {
                message = messageOrCode;
            }
        }

        if (typeof messageOrCode === 'number') {
            code = messageOrCode;
        } else if (typeof maybeCode === 'number') {
            code = maybeCode;
        }

        const response: any = {
            status: true,
            message,
        };

        if (data !== null && data !== undefined) {
            response.data = data;
        }

        return this.res.status(code).json(response);
    }


    public error(message: string = 'Something went wrong', code: number = 500, errors: any = null) {
        return this.res.status(code).json({
            status: false,
            message,
            errors,
        });
    }
}

export default HttpResponse;
