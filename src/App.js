import Nav from './components/Nav';
import Form from './pages/Form'

function App() {
  return (
    <div className="App" style={{
      backgroundColor: '#f3f2f1',
      height: '100vh',
      width: '100vw',
    }}>
      <Nav />
      <Form />
    </div>
  );
}

export default App;
