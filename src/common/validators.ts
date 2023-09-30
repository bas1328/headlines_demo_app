export const validateEnvVar = (variable: string | undefined) => {
    if (!variable) {
        throw new Error("Environment variable is undefined");
    }
    return variable;
};
