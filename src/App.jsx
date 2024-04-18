// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { useGlobalContext } from './Context';

function App() {
  const { loading } = useGlobalContext();
  if (!loading) {
    return (
      <main>
        <Navbar />
        <CartContainer />
      </main>
    );
  } else {
    return (
      <main>
        <div className="loading" style={{ margin: '15% auto' }}></div>
      </main>
    );
  }
}

export default App;
