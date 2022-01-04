declare module 'react-codepen-embed' {
  import * as React from 'react';

  export interface Props {
    /**
     * The Id of the pen to embed
     */
    hash: string;

    /**
     * CodePen username
     */
    user: string;

    /**
     * Height of the pen
     * @default 300
     */
    height?: number;

    /**
     * Loader to render while the pen is being embedded or errors out
     */
    loader?: React.ReactNode;

    /**
     * Default tab to display
     * @default 'css,result'
     */
    defaultTab?: string;

    /**
     * Make code editable
     * @default 'false'
     */
    editable?: boolean;

    /**
     * Theme for the pen
     * @default 'dark'
     */
    themeId?: string;

    /**
     * Make the preview 'Click-to-Load'
     * @default true
     */
    preview?: boolean;

    /**
     * Title of the pen
     */
    title?: string;
  }

  const ReactCodepen: React.FC<Props>;
  export default ReactCodepen;
}
