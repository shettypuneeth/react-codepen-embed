const SCRIPT_URL = 'https://production-assets.codepen.io/assets/embed/ei.js';

interface ScriptTagBuilder {
    appendTo(element: HTMLElement)
}

class CodepenEmbedScriptTagBuilder implements ScriptTagBuilder {
    private src = SCRIPT_URL;
    private isAsync = false;
    private onload = null;
    private onerror = null;

    withSrc(src: string) {
        this.src = src;
        return this;
    }

    setAsync(isAsync: boolean) {
        this.isAsync = isAsync;
        return this;
    }

    withOnLoadHandler(onload: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
        this.onload = onload;
        return this;
    }

    withOnErrorHandler(onerror: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
        this.onerror = onerror;
        return this;
    }

    appendTo(element, createScriptTag = createDefaultScriptTag) {
        const script = createScriptTag();
        script.src = this.src;
        script.async = this.isAsync;
        script.onload = this.onload;
        script.onerror = this.onerror;
        element.appendChild(script);
    }
}

function createDefaultScriptTag() {
    return document.createElement('script');
}

export default CodepenEmbedScriptTagBuilder;
export {ScriptTagBuilder};