import Layout from './components/Layout/Layout';
import { Provider } from 'react-redux';
import ContextProviders from './store/context-store/ContextProviders';
import reduxStore from './store/redux-store/reduxStore';
import './global.css';

const App: React.FC = () => (
  <>
    {/* uncomment the "ContextProviders" component to use Context API as global state management */}
    {/* uncomment the "Provider" component to use Redux API as global state management */}
    {/* By default zustand is the global state management */}

    {/* <ContextProviders> */}
    {/* <Provider store={reduxStore}> */}
    <Layout />
    {/* </Provider> */}
    {/* </ContextProviders> */}
  </>
);

export default App;
