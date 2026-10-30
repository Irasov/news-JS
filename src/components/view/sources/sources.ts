import './sources.css';
import { Source } from '../../controller/controller';

type SourcePreview = Pick<Source, 'id' | 'name'>;

class Sources {
    draw(data: SourcePreview[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Template #sourceItemTemp not found');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            this.getElement(sourceClone, '.source__item-name').textContent = item.name;
            this.getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        this.getElement(document, '.sources').append(fragment);
    }

    private getElement<T extends HTMLElement = HTMLElement>(parent: ParentNode, selector: string): T {
        const element = parent.querySelector<T>(selector);

        if (!element) {
            throw new Error(`Element ${selector} not found`);
        }

        return element;
    }
}

export default Sources;
