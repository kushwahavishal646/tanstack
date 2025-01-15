import logo from './logo.svg';
import './App.css';
import Fetch from './Fetch';
import DebouncedQueryExample from './DebounceQueryExample';
import ThrottledQueryExample from './ThrottleQueryExample';
import RetryQueryExample from './RetryQueryExample';
import SerialQueryExample from './SerialQueryExample';
import ParallelQueryExample from './ParallelQueryExample';
import InfiniteQueryExample from './InfiniteQueryExample';

function App() {
  return (
    <div className="App">
       <Fetch/>
       {/* <DebouncedQueryExample/> */}
       {/* <ThrottledQueryExample/> */}
       {/* <RetryQueryExample/> */}
       {/* <SerialQueryExample/> */}
       {/* <ParallelQueryExample/> */}
       {/* <InfiniteQueryExample/> */}
       {/* useMutation */}
    </div>
  );
}

export default App;
