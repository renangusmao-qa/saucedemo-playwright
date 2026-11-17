# Automação de testes com Playwright + TypeScript

Projeto de portfólio com testes automatizados no site de demonstração [SauceDemo](https://www.saucedemo.com).

## O que é testado

**Login** ([tests/login.spec.ts](tests/login.spec.ts))
- Login válido leva à lista de produtos
- Senha inválida mostra mensagem de erro
- Usuário bloqueado mostra mensagem de erro

**Carrinho e checkout** ([tests/checkout.spec.ts](tests/checkout.spec.ts))
- Adicionar produto atualiza o contador do carrinho
- Remover produto esvazia o carrinho
- Checkout completo finaliza o pedido
- Checkout sem dados obrigatórios mostra mensagem de erro

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
