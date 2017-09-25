import { User } from './user';
import { get } from 'axios';

declare global {
  interface Window {
    AppHub: any;
  }
  var Promise: any;
}

function fetchAppConfig(): Promise<object> {
  return get('/config/')
    .then(response => {
      return Promise.resolve(response.data);
    });
};

function fetchNavConfig(id: string): Promise<object> {
  return get('/config/nav/' + id)
    .then(response => {
      return Promise.resolve(response.data);
    });
};

// fetchAppConfig().then(config => {
//   console.log(config);
// });

window.AppHub = {
  fetchAppConfig: fetchAppConfig
};
