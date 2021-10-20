import logo from './logo.svg';
import './App.css';
import {SpearlyClient, SpearlyProvider} from './component/index';
import Content from './Content'

const spearlyClient = SpearlyClient({
  domain: 'nh6zyt31q7gz',
  apikey: '23b20723ef0ffdc1f0e123e8fb76cffeacac8ec8b9199ed3e384cc37cf2256b7',
  apiVersion: 2,
});

function App() {
  return (
    <SpearlyProvider client={spearlyClient}>
      <Content {...props}/>
    </SpearlyProvider>
  );
}

export default App;
