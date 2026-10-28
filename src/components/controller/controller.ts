import AppLoader from './appLoader';
import { Callback } from './loader';
import { Endpoint } from './loader';

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    sorce: ArticleSource;
    author: string | null;
    titel: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SorcesResponse {
    status: string;
    sources: Source[];
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}


class AppController extends AppLoader {
    getSources(callback: Callback<SorcesResponse>) {
        super.getResp<SorcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: Callback<NewsResponse>): void {
        let target = e.target;
        const newsContainer = e.currentTarget;  

        if (!(newsContainer instanceof HTMLElement)) return;

        while (target !== newsContainer) {
            if (!(target instanceof HTMLElement)) return;
            
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
