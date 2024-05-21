interface ContractCallError {
    name: string;
    message: string;
}

interface ContractCallErrorCodes {
    [code: number]: ContractCallError;
}

export function getContractCallErrorCode(error: Error): number {
    if (error instanceof Error) {
        // console.log(error.message)
        const errorCode = error.message.split(") in command")[0].slice(-1);
        return parseInt(errorCode);
    } else {
        console.log("Unknown error occurred.");
        return 0;
    }
}

export function getErrorMessage(errorCode: number, errorCodes: ContractCallErrorCodes): string {
    const error = errorCodes[errorCode];
    if (error) {
        return error.message;
    } else {
        return "Unknown error occurred.";
    }
}

export function getContractCallErrorMessage(error: Error, errorCodes: ContractCallErrorCodes) {
    const errorCode = getContractCallErrorCode(error);
    const errorMessage = getErrorMessage(errorCode, errorCodes);
    return { errorCode, errorMessage };
}
