import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SCRIPT_URL = 'https://production-assets.codepen.io/assets/embed/ei.js';

class ReactCodepen extends Component {
  state = { loaded: false, loading: true };

  componentDidMount() {
    this._mounted = true;

    // load the codepen embed script
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = 1;
    script.onload = () => {
      // do not do anything if the component is already unmounted.
      if (!this._mounted) return;

      this.setState({
        loaded: true,
        loading: false
      });
    }
    script.onerror = () => {
      if (!this._mounted) return;

      this.setState({
        error: 'Failed to load the pen'
      });
    }

    document.body.appendChild(script);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    if (!this.state.loaded || this.state.loading) {
      return React.createElement(this.props.loader, {
        isLoading: this.state.loading,
        error: this.state.error
      });
    } else if (this.state.loaded) {
      const penLink = `https://codepen.io/${this.props.user}/pen/${this.props.hash}/`;
      const userProfileLink = `https://codepen.io/${this.props.user}`;

      return (
        <p 
          data-height={this.props.height}
          data-theme-id={this.props.themeId}
          data-slug-hash={this.props.hash}
          data-default-tab={this.props.defaultTab}
          data-user={this.props.user}
          data-embed-version={this.props.version}
          data-pen-title={this.props.title}
          data-preview={this.props.preview}
          class="codepen"
        >
          See the Pen <a href={penLink}>{this.props.title}</a>
          by {this.props.user} (<a href={userProfileLink}>@{this.props.user}</a>) 
          on <a href="https://codepen.io">CodePen</a>.
        </p>
      );
    } else {
      return null;
    }
  }
}

ReactCodepen.defaultProps = {
  defaultTab: 'css,result',
  height: 265,
  loader: null,
  preview: true,
  themeId: 'dark',
  version: 2
};

ReactCodepen.propTypes = {
  defaultTab: PropTypes.string,
  hash: PropTypes.string.isRequired,
  height: PropTypes.number,
  loader: PropTypes.node,
  preview: PropTypes.bool,
  title: PropTypes.string,
  themeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  user: PropTypes.string.isRequired,
  version: PropTypes.number
};

export default ReactCodepen;