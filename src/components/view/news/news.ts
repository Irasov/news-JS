import './news.css';
import { Article } from '../../controller/controller';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('Template #newsItemTemp not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) this.getElement(newsClone, '.news__item').classList.add('alt');

            this.getElement(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            this.getElement(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            this.getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            this.getElement(newsClone, '.news__description-title').textContent = item.title;
            this.getElement(newsClone, '.news__description-source').textContent = item.source.name;
            this.getElement(newsClone, '.news__description-content').textContent = item.description;
            this.getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const container = this.getElement(document, '.news');
        container.innerHTML = '';
        container.appendChild(fragment);
    }
    
    private getElement<T extends HTMLElement = HTMLElement>(parent: ParentNode, selector: string): T {
        const element = parent.querySelector<T>(selector);

        if (!element) {
            throw new Error(`Element ${selector} not found`);
        }

        return element;
    }

}

export default News;
