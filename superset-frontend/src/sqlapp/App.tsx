import ToastContainer from 'src/components/MessageToasts/ToastContainer';
import ExtensionsStartup from 'src/extensions/ExtensionsStartup';
import SqlLab from 'src/pages/SqlLab';
import setupApp from 'src/setup/setupApp';
import setupCodeOverrides from 'src/setup/setupCodeOverrides';
import setupPlugins from 'src/setup/setupPlugins';
import { RootContextProviders } from 'src/views/RootContextProviders';
import { BrowserRouter as Router } from 'react-router-dom';
import setupClient from '../setup/setupClient';
import { applicationRoot } from '../utils/getBootstrapData';
import { setupAGGridModules } from '@superset-ui/core/components/ThemedAgGridReact';
setupClient({
  host: '127.0.0.1:8088',
  mode: 'cors',
  appRoot: applicationRoot(),
});
setupApp();
setupPlugins();
setupCodeOverrides();
setupAGGridModules();
export const App = () => (
  <Router>
    <RootContextProviders>
      <ExtensionsStartup />
      <SqlLab />
      <ToastContainer />
    </RootContextProviders>
  </Router>
);
