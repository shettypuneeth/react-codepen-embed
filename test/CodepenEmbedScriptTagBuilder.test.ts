import CodepenEmbedScriptTagBuilder from "../src/CodepenEmbedScriptTagBuilder";

describe('CodepenEmbedScriptTagBuilder', function () {
    it('should create builder', function () {
        // given
        const mockElement = {appendChild: jest.fn()}, mockScriptTag: any = {};
        const builder = new CodepenEmbedScriptTagBuilder();

        // when
        builder.appendTo(mockElement, () => mockScriptTag as any);

        // then
        expect(mockScriptTag.src).toEqual('https://production-assets.codepen.io/assets/embed/ei.js');
        expect(mockScriptTag.async).toEqual(false);
        expect(mockScriptTag.onload).toEqual(null);
        expect(mockScriptTag.onerror).toEqual(null);

        expect(mockElement.appendChild).toBeCalledWith(mockScriptTag)
    });
});