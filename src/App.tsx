import { useCallback, useState } from 'react';
import textToDataUrl from './utils/textToDataUrl';
import { defaultTextProperties } from './constants';

const App = () => {
  const [text, setText] = useState('');

  const getTextImg = useCallback(
    () => textToDataUrl(text, defaultTextProperties),
    [text]
  );

  return (
    <>
      <header>
        <h1>Text to Image</h1>
        <p id='instructions'>Enter any text to turn it into an image.</p>
      </header>

      <main>
        <div id='result-container'>
          {text && <img id='result-img' alt={text} src={getTextImg()} />}
        </div>
        <div id='options-container'>
          <label htmlFor='input-text'>Text</label>
          <input
            type='text'
            id='input-text'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </main>

      <pre id='user-agent-text'>User agent: {navigator.userAgent}</pre>
    </>
  );
};

export default App;
