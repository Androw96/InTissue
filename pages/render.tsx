import { renderToString } from 'react-dom/server';
import { PagesApp, routes } from './app';
export { routes };
export function render(path: string) {
  return renderToString(<PagesApp path={path} language="hu" />);
}
