import React, {  useEffect } from 'react';

function Content(props) {

  useEffect(() => {
      console.log(props);
      let content = props.client.getContent('aaaaaaa');
      console.log(content);
  });

  return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default Content;
