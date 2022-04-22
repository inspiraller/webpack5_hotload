import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App, { Props as AppProps } from "src/App";

import './index.scss'
export interface RenderProps {
  App: ComponentType<AppProps>;
}

export type TRender = (props: RenderProps) => void;
export const render: TRender = ({  App }) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root") || document.createElement("div")
  );
};
interface HotProps extends RenderProps {
  render: TRender;
}

type THot = (props: HotProps) => void;
const handleHotReload: THot = ({ render, App }) => {
  if (module && module.hot) {
    module.hot.accept("src/App", () => {
      return render({ App });
    });
  }
};

render({ App });
handleHotReload({ render, App });

export default {};
