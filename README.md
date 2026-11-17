# Automação de testes com Playwright + TypeScript

Projeto de portfólio com testes automatizados no site de demonstração [SauceDemo](https://www.saucedemo.com).

> 🚧 Em construção. Por enquanto só a estrutura do projeto está pronta; os testes chegam nas próximas etapas.

## Tecnologias

- [Playwright Test](https://playwright.dev) (navegador Chromium)
- TypeScript
- Node.js

## Como rodar

Pré-requisito: Node.js instalado.

```bash
npm install                      # instala as dependências
npx playwright install chromium  # baixa o navegador usado nos testes
npm test                         # roda os testes
npm run report                   # abre o relatório HTML da última execução
```
