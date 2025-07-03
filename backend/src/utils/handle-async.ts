export async function handleAsync<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
    try {
        const data = await promise
        return [null, data]
    } catch (error) {
        return [error as Error, null]
    }
}