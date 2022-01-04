import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const SCRIPT_URL = 'https://static.codepen.io/assets/embed/ei.js'; // new embed
const LOAD_STATE = {
  booting: '__booting__',
  error: '__error__',
  loading: '__loading__',
  loaded: '__loaded__',
};

const ReactCodepen = props => {
  const [loadState, setLoadState] = useState(LOAD_STATE.booting);
  const [error, setError] = useState();
  const _isMounted = useRef(false);

  const loadScript = () => {
    // load the codepen embed script
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = 1;
    script.onload = () => {
      // do not do anything if the component is already unmounted.
      if (!_isMounted.current) return;
      setLoadState(LOAD_STATE.loaded);
    };
    script.onerror = () => {
      if (!_isMounted.current) return;
      setLoadState(LOAD_STATE.error);
      setError('Failed to load the pen');
    };

    setLoadState(LOAD_STATE.loading);
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (_isMounted.current === false) _isMounted.current = true;

    loadScript();

    return () => (_isMounted.current = false);
  }, []);

  const showLoader =
    loadState === LOAD_STATE.loading && props.loader !== undefined;
  const visibility = loadState === LOAD_STATE.loaded ? 'visible' : 'hidden';
  const penLink = `https://codepen.io/${props.user}/pen/${props.hash}/`;
  const userProfileLink = `https://codepen.io/${props.user}`;
  const styles = { visibility };

  return (
    <React.Fragment>
      {showLoader &&
        React.createElement(props.loader, {
          isLoading: loadState === LOAD_STATE.loading,
          error,
        })}
      <p
        data-height={props.height}
        data-theme-id={props.themeId}
        data-slug-hash={props.hash}
        data-default-tab={props.defaultTab}
        data-user={props.user}
        data-embed-version={props.version}
        data-pen-title={props.title}
        data-preview={props.preview}
        data-editable={props.editable}
        className="codepen"
        style={styles}
      >
        See the Pen <a href={penLink}>{props.title}</a>
        by {props.user} (<a href={userProfileLink}>@{props.user}</a>) on{' '}
        <a href="https://codepen.io">CodePen</a>.
      </p>
    </React.Fragment>
  );
};

ReactCodepen.defaultProps = {
  defaultTab: 'css,result',
  height: 300,
  preview: true,
  editable: false,
  themeId: 'dark',
  version: 2,
};

ReactCodepen.propTypes = {
  defaultTab: PropTypes.string,
  hash: PropTypes.string.isRequired,
  height: PropTypes.number,
  loader: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  preview: PropTypes.bool,
  editable: PropTypes.bool,
  title: PropTypes.string,
  themeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  user: PropTypes.string.isRequired,
  version: PropTypes.number,
};

export default ReactCodepen;
