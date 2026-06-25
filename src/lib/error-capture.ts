let lastCapturedError: Error | null = null;

const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
    for (const arg of args) {
        if (arg instanceof Error) {
            lastCapturedError = arg;
            break;
        }
    }
    originalConsoleError.apply(console, args);
};

export function consumeLastCapturedError(): Error | null {
    const err = lastCapturedError;
    lastCapturedError = null;
    return err;
}
