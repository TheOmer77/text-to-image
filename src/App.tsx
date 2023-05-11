import { Fragment, useCallback, useState } from 'react';
import textToDataUrl, { type TextImageProperties } from './utils/textToDataUrl';
import { defaultTextProperties, optionsFields } from './constants';

const App = () => {
  const [text, setText] = useState('');
  const [textProps, setTextProps] = useState<TextImageProperties>(
    defaultTextProperties
  );

  const getTextImg = useCallback(
    () => textToDataUrl(text, textProps),
    [text, textProps]
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
            value={text || ''}
            onChange={(e) => setText(e.target.value)}
          />
          {optionsFields.map(({ id, label, type }) => (
            <Fragment key={id}>
              <label htmlFor={`input-${id}`}>{label}</label>
              <input
                type={type === 'number' ? 'number' : 'text'}
                id={`input-${id}`}
                value={textProps[id as keyof TextImageProperties]}
                onChange={(e) =>
                  setTextProps((prev) => ({ ...prev, [id]: e.target.value }))
                }
              />
            </Fragment>
          ))}
        </div>
      </main>

      <pre id='user-agent-text'>User agent: {navigator.userAgent}</pre>
    </>
  );
};

export default App;
