# Automação de testes com Playwright + TypeScript

Este é meu projeto de portfólio para praticar automação de testes. Uso o [SauceDemo](https://www.saucedemo.com), um site de demonstração feito para esse tipo de treino.

## O que já fiz

Escrevi sete testes. Três cobrem o login: entrar com um usuário válido, errar a senha e tentar entrar com um usuário bloqueado. Os outros quatro cobrem o carrinho e o checkout: adicionar um produto, removê-lo, finalizar um pedido e tentar finalizar sem preencher os dados obrigatórios. Os arquivos estão em `tests/login.spec.ts` e `tests/checkout.spec.ts`.

## O que aprendi

Usei os atributos `data-test` do site como seletores. Eles quebram menos que seletores de CSS e deixam o teste mais fácil de ler. Também percebi que repito o mesmo login nos dois arquivos. Pretendo resolver isso com um Page Object e uma fixture na próxima etapa.

## Tecnologias

Playwright Test com Chromium, TypeScript e Node.js.

## Como rodar

Preciso do Node.js instalado. Depois, rodo estes comandos:

```bash
npm install                      # instala as dependências
npx playwright install chromium  # baixa o navegador usado nos testes
npm test                         # roda os testes
npm run report                   # abre o relatório HTML da última execução
```
