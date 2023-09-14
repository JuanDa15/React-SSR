import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from '../../app/containers/App'
import { template } from './template'
import { ServerStyleSheet } from 'styled-components'


export const render = (url: string, initialProps={}) => {
  const sheet = new ServerStyleSheet();
  try {
    const stream = renderToString(sheet.collectStyles(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    ))
    const styleTags = sheet.getStyleTags()

    const html = template(stream, styleTags, initialProps);
    return html
  } catch (e) {
    console.log(e)
  } finally {
    sheet.seal()
  }
}