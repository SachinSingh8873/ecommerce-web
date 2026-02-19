// API Error Response Handler
export class APIError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public details?: any
    ) {
        super(message);
        this.name = "APIError";
    }
}

export function createErrorResponse(statusCode: number, message: string, details?: any) {
    return {
        error: message,
        ...(details && { details }),
        timestamp: new Date().toISOString(),
    };
}

export function handleAPIError(error: unknown) {
    console.error("[API_ERROR]", error);

    if (error instanceof APIError) {
        return new Response(
            JSON.stringify(createErrorResponse(error.statusCode, error.message, error.details)),
            { status: error.statusCode, headers: { "Content-Type": "application/json" } }
        );
    }

    if (error instanceof SyntaxError) {
        return new Response(
            JSON.stringify(createErrorResponse(400, "Invalid JSON in request body")),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(
        JSON.stringify(createErrorResponse(500, "Internal server error")),
        { status: 500, headers: { "Content-Type": "application/json" } }
    );
}
