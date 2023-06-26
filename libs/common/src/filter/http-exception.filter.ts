import _ from "lodash";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { I18nContext } from "nestjs-i18n";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const i18n = I18nContext.current(host);
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const data = exception.getResponse();
        let result;

        if (i18n) {
            if (typeof data == 'string') {
                result = i18n.translate(data, { defaultValue: data });
            } else {
                result = _.mapValues(data, (value) => {
                    if (typeof value == 'string') {
                        return i18n.translate(value, { defaultValue: value });
                    } else {
                        return value;
                    }
                });
            }
        } else {
            result = data;
        }

        return response.status(status).json(result);
    }
}