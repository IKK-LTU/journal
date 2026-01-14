import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";


/**
 * @param {string} _url
 */

type IRenderProps = {
  path: string;
};
export function render({ path }: IRenderProps) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html };
}
