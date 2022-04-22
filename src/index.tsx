import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import App, { Props as AppProps } from "src/App";

import './index.scss'
export interface RenderProps {
  App: ComponentType<AppProps>;
}

export type TRender = (props: RenderProps) => void;
export const render: TRender = ({  App }) => {
  ReactDOM.render(
      <App />,
    document.getElementById("root") || document.createElement("div")
  );
};


render({ App });

export default {};
