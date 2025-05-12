import ErrorHandlingFunctions from "./errorHandlingFunction.js";
import ErrorResponseGenerate from "./errorResponseGeneration.js";

export function ErrorHandlingMiddleware(error, req, res, next) {
    // get the statusCode fro error object 

        // here check the statusCode is available or 
        // not else set statusCode as 500 (internal server error) default 

                error.statusCode = error.statusCode || 500;
                error.status = error.status || 'error'

        // here we can send the error information acording to nodeEnvironment 
        // node Environment like -> developmentEnv, testEnv, productionEnv
        // we can send detailed error information to developmentEnv but we can not send the Detailed error information in PorductionEnv
            console.log(process.env.NODE_ENV)
            if (process.env.NODE_ENV === 'LOCAL') {    
               
                // generate the error for development environment
                    ErrorResponseGenerate.generateErrorForDevelopmentEnvironment(res, error);

            } else if(process.env.NODE_ENV === 'DEVELOPMENT' || process.env.NODE_ENV === 'PRODUCTION' ) {
             
                // cast error handling

                    if (error.name === 'CastError') {
                        error = ErrorHandlingFunctions.castErrorHandler(error)
                    } 

                // mongodb duplicate key error handle
                // error.code === 11000 is duplicate key

                    if (error.code === 11000) {
                        error =  ErrorHandlingFunctions.duplicateKeyErrorHandle(error)
                    }

                // mongodb validation error 

                    if (error.name === 'ValidationError') {
                        error = ErrorHandlingFunctions.validationErrorHandle(error);
                    }

                // generate the error for Production environent
                    ErrorResponseGenerate.generateErrorForProductionEnvironment(res, error);
            }
    next();
}