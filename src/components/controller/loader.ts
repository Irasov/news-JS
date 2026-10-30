export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}
export type UrlOptions = Record<string, string>;

export type Callback<T> = (data: T) => void;

export interface RequestParamtrs {
    endpoint: Endpoint;
    options?: Partial<UrlOptions>;
}

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<UrlOptions>;
    constructor(baseLink:string, options: UrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestParamtrs ,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<UrlOptions>, endpoint: Endpoint): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod, 
        endpoint: Endpoint, 
        callback: Callback<T>,
        options: Partial<UrlOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res): Promise<T> => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
