import { render } from 'preact';

function App() {
  return <h1>League Macro Learner</h1>;
}

const root = document.getElementById('app');
if (root) render(<App />, root);
