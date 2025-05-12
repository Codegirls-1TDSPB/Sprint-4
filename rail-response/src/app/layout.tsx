// app/layout.tsx ou src/layout.tsx
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Definindo a tag <html> */}
      <html lang="pt-BR">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Meu App</title>
          {/* Aqui você pode adicionar links para fontes, favicon, etc. */}
        </head>
        <body>
          {/* Corpo do layout */}
          <header>
            {/* Seu cabeçalho */}
          </header>
          <main>{children}</main>
          <footer>
            {/* Seu rodapé */}
          </footer>
        </body>
      </html>
    </>
  )
}

export default Layout
