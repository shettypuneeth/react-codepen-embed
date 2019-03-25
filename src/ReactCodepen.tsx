import * as React from 'react';
import {Component, ComponentClass, FunctionComponent} from 'react';
import CodepenEmbedScriptTagBuilder, {ScriptTagBuilder} from "./CodepenEmbedScriptTagBuilder";

type ErrorType = string;

interface LoaderProps {
    isLoading: boolean,
    error: ErrorType
}

interface ReactCodepenProps {
    defaultTab: string,
    hash: string,
    height: number,
    loader?: FunctionComponent<LoaderProps> | ComponentClass<LoaderProps> | string,
    preview: boolean,
    title?: string,
    themeId: string | number,
    user: string,
    version: number,
    shouldLoadScript: boolean,
    overrideAsLoaded?: boolean
}

interface ReactCodepenState {
    loaded: boolean,
    loading: boolean,
    error?: ErrorType,
}

class ReactCodepen extends Component<ReactCodepenProps, ReactCodepenState> {
    private _mounted: boolean;
    private scriptTagBuilder: ScriptTagBuilder;

    static defaultProps = {
        defaultTab: 'css,result',
        height: 300,
        preview: true,
        themeId: 'dark',
        version: 2,
        shouldLoadScript: true
    };

    state = {loaded: false, loading: true, error: undefined};

    constructor(props: ReactCodepenProps, context) {
        super(props, context);

        this.scriptTagBuilder = new CodepenEmbedScriptTagBuilder()
            .setAsync(true)
            .withOnLoadHandler(this.handleScriptLoad.bind(this))
            .withOnErrorHandler(this.handleScriptError.bind(this));
    }

    componentDidMount() {
        this._mounted = true;

        if (this.props.shouldLoadScript) {
            // load the codepen embed script
            this.scriptTagBuilder.appendTo(document.body);
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        if (!this.isLoaded() && this.props.loader) {
            const loaderComponent = React.createElement(this.props.loader, {
                isLoading: this.state.loading,
                error: this.state.error
            });
            return (
                <div
                    data-height={this.props.height}
                    data-theme-id={this.props.themeId}
                    data-slug-hash={this.props.hash}
                    data-default-tab={this.props.defaultTab}
                    data-user={this.props.user}
                    data-embed-version={this.props.version}
                    data-pen-title={this.props.title}
                    data-preview={this.props.preview}
                    className="codepen"
                >
                    {loaderComponent}
                </div>
            );
        } else if (this.isLoaded()) {
            const penLink = `https://codepen.io/${this.props.user}/pen/${this.props.hash}/`;
            const userProfileLink = `https://codepen.io/${this.props.user}`;

            return (
                <div
                    data-height={this.props.height}
                    data-theme-id={this.props.themeId}
                    data-slug-hash={this.props.hash}
                    data-default-tab={this.props.defaultTab}
                    data-user={this.props.user}
                    data-embed-version={this.props.version}
                    data-pen-title={this.props.title}
                    data-preview={this.props.preview}
                    className="codepen"
                >
                    See the Pen <a href={penLink}>{this.props.title}</a>
                    by {this.props.user} (<a href={userProfileLink}>@{this.props.user}</a>)
                    on <a href="https://codepen.io">CodePen</a>.
                </div>
            );
        } else {
            return null;
        }
    }

    private isLoaded() {
        return this.props.overrideAsLoaded || this.state.loaded;
    }

    private handleScriptLoad() {
        // do not do anything if the component is already unmounted.
        if (!this._mounted) return;

        this.setState({
            loaded: true,
            loading: false
        });
    }

    private handleScriptError() {
        if (!this._mounted) return;

        this.setState({
            error: 'Failed to load the pen'
        });
    }
}

export default ReactCodepen;