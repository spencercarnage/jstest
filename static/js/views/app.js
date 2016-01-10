'use strict';

import home from './home';
import about from './about';

export default (state) => {
  const { url } = state
  let page

  if (url === '/') {
    page = home(state)
  } else if (url === '/about') {
    page = about(state);
  }

  return (
    <main>
      <h1>App</h1>

      <nav>
        <a className="nav" href='/'>home</a> | <a className="nav" href='/about'>about</a>
      </nav>
      {page}
    </main>
  )
}
