import * as yup from "yup";
import { Schema, ValidationError } from "yup";

export function validateSchema<T>(schema: Schema, data: T): Record<string, string> | void {
    try {
        schema.validateSync(data, { abortEarly: false })

    } catch (error) {
        const yupError = error as ValidationError;
        const objectErros: Record<string, string> = {};

        yupError.inner.forEach(err => {
            if (!err.path) return;

            objectErros[err.path] = err.message;
        })

        return objectErros
    }
}

