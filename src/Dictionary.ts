import { AxiosResponse } from "axios";
import axios from 'axios'

class Dictionary {
    source: string;
    word: string;
    content: string | null;
    constructor(word: string) {
        this.source = "";
        this.content = "";
        this.word = word; 
    }

    async find(): Promise<Dictionary> {
        let request = new Promise<Dictionary>((resolve) => {
            axios({
                method: 'get',
                url: this.source.replace("{word}", this.word),
            }).then((response: AxiosResponse) => {
                this.content = response.data;
                resolve(this);
            });
        });

        return await request;
    }
    private getData(element: HTMLElement, data: string = "text"): string | null {
        if (data == "html") {
            return element.innerHTML;
        } else if (data == "text" && typeof element?.innerText !== "undefined") {
            return element.innerText;
        } else {
            return element.getAttribute(data);
        }
        return "";
    }
    getSelector(selector: string, data: string = "text", sep: any = "\n"): string | null {
        let div : HTMLElement = document.createElement('div');
        if(this.content !== null){
            div.innerHTML = this.content;
        }
        let elements: NodeListOf<HTMLElement> = div.querySelectorAll(selector);
        if (elements !== null && elements.length > 0) {
            let content = "";
            if (typeof sep === "number") {
                return this.getData(elements[sep], data);
            }
            elements.forEach((item) => {
                content += this.getData(item, data);
                content += sep;
            });

            return content;
        }
        return "";
    }

    getType(): string | null {
        return "";
    }

    getSound(accent: string = "us"): string | null {
        return accent;
    }

    getDescription(): string | null {
        return "";
    }

    getSynonyms(): string | null {
        return "";
    }
}

class Cambridge extends Dictionary {
    constructor(word: string) {
        super(word);

        this.source = "https://coderboy.ir/cambridge.php?word={word}";
    }

    getType(): string | null {
        return this.getSelector(".entry-body .pos-header>.posgram", "text", 0);
    }

    getDescription(): string | null {
        let content = this.getSelector(".entry-body .pos-body>.dsense:first-of-type>.sense-body>.def-block>.ddef_h>.def") + '\n';
        content += this.getSelector(".entry-body .pos-body>.dsense:first-of-type>.sense-body>.def-block>.def-body>.examp");
        return content;
    }

    getSynonyms(): string | null {
        return this.getSelector(".entry-body .pos-body>.dsense:first-of-type>.sense-body>.def-block>.def-body>.synonyms");
    }
    getSound(accent: string = "us"): string | null {
        let sound = null;
        if (accent === "us") {
            sound = this.getSelector(".entry-body .pos-header>.dpron-i.us audio source[type=\"audio/mpeg\"]", "src", 0);
        }
        if (accent === "uk") {
            sound = this.getSelector(".entry-body .pos-header>.dpron-i.uk audio source[type=\"audio/mpeg\"]", "src", 0);
        }
        return 'https://dictionary.cambridge.org/' + sound;
    }
}

class Oxford extends Dictionary {
    constructor(word: string) {
        super(word);

        this.source = "https://coderboy.ir/oxford.php?word={word}";
    }

    getType(): string | null {
        return this.getSelector("#entryContent .top-g span.pos", "text", 0);
    }

    getDescription(): string | null {
        let content = this.getSelector("#entryContent .senses_multiple>.sense:first-of-type>span.def") + '\n';
        content += this.getSelector("#entryContent .senses_multiple>.sense:first-of-type>.examples>li");
        return content;
    }

    getSynonyms(): string | null {
        return "";
    }
    getSound(accent: string = "us"): string | null {
        let sound = null;
        if (accent === "us") {
            sound = this.getSelector("#entryContent .top-g .phonetics .phons_n_am .sound[data-src-mp3]", "data-src-mp3", 0);
        }
        if (accent === "uk") {
            sound = this.getSelector("#entryContent .top-g .phonetics .phons_br .sound[data-src-mp3]", "data-src-mp3", 0);
        }
        return sound;
    }
}

export default Dictionary;

export { Cambridge, Oxford };