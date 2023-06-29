import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const SCRIPT_URL = 'https://static.codepen.io/assets/embed/ei.js'; // new embed
const LOAD_STATE = {
  booting: '__booting__',
  error: '__error__',
  loading: '__loading__',
  loaded: '__loaded__',
};

const ReactCodepen = ({
  defaultTab = 'css,result',
  height = 300,
  preview = true,
  editable = false,
  themeId = 'dark',
  version = 2,
  loader,
  user,
  hash,
  title,
}) => {
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

  const showLoader = loadState === LOAD_STATE.loading && loader !== undefined;
  const visibility = loadState === LOAD_STATE.loaded ? 'visible' : 'hidden';
  const penLink = `https://codepen.io/${user}/pen/${hash}/`;
  const userProfileLink = `https://codepen.io/${user}`;
  const styles = { visibility };

  return (
    <React.Fragment>
      {showLoader &&
        React.createElement(loader, {
          isLoading: loadState === LOAD_STATE.loading,
          error,
        })}
      <p
        data-height={height}
        data-theme-id={themeId}
        data-slug-hash={hash}
        data-default-tab={defaultTab}
        data-user={user}
        data-embed-version={version}
        data-pen-title={title}
        data-preview={preview}
        data-editable={editable}
        className="codepen"
        style={styles}
      >
        See the Pen <a href={penLink}>{title}</a>
        by {user} (<a href={userProfileLink}>@{user}</a>) on{' '}
        <a href="https://codepen.io">CodePen</a>.
      </p>
    </React.Fragment>
  );
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
