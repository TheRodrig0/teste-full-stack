export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const defaultHeaders: HeadersInit = {}

    if (options.body) {
        defaultHeaders['Content-Type'] = 'application/json'
    }

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    }

    const response = await fetch(endpoint, config)

    if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(`Erro na requisição API: Status ${response.status} - ${errorBody}`)
    }

    if (response.status === 204) {
        return undefined as T 
    }

    const body = await response.json()
    
    return body.data as T
}