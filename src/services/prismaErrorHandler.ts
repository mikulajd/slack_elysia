import { Prisma } from "@prisma/client";
export function handlePrismaError(error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientValidationError
    ) {
        return Error("Database error occured")

    } else {
        return Error("Unexpected error occured");
    }
}
export class PrismaError extends Error {
    constructor(public message
        : string) {
        super(message);
        this.name = 'PrismaError';
    }
}