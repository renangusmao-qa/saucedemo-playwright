# Automação de testes com Playwright + TypeScript

Este é meu projeto de portfólio para praticar automação de testes. Uso o [SauceDemo](https://www.saucedemo.com), um site de demonstração feito para esse tipo de treino.

## O que já fiz

Escrevi 21 testes, divididos em três arquivos.

Em `tests/login.spec.ts` testo o login: entrar com um usuário válido, errar a senha, deixar usuário ou senha em branco e tentar entrar com um usuário bloqueado. Também confirmo que o `problem_user` e o `performance_glitch_user` conseguem entrar. Não testo o comportamento deles depois do login.

Em `tests/inventory.spec.ts` testo a lista de produtos: a quantidade de itens, a ordenação por preço e por nome, o detalhe de um produto, o logout e se o carrinho mantém o produto depois de navegar.

Em `tests/checkout.spec.ts` testo o carrinho e o checkout: adicionar e remover produtos, o contador com dois itens, continuar comprando, finalizar um pedido, o resumo com subtotal, imposto e total, cancelar o checkout e tentar finalizar sem preencher os dados.

## O que aprendi

Usei os atributos `data-test` do site como seletores. Eles quebram menos que seletores de CSS e deixam o teste mais fácil de ler. O login se repetia nos três arquivos de teste, então movi essa lógica para Page Objects em `pages/`: login, inventário, carrinho e checkout. As fixtures em `tests/fixtures.ts` entregam esses objetos prontos para os testes, e a `inventoryPage` já vem logada como `standard_user`. Assim os seletores ficam em um lugar só e os testes ficam mais curtos. Também passei a checar os tipos com o `tsc`, porque o Playwright compila o TypeScript mas não verifica os tipos.

## Tecnologias

Playwright Test com Chromium, TypeScript e Node.js. Também deixei pronto um workflow do GitHub Actions em `.github/workflows/tests.yml`, que ainda não rodei.

## Como rodar

Preciso do Node.js instalado. Depois, rodo estes comandos:

```bash
npm install                      # instala as dependências
npx playwright install chromium  # baixa o navegador usado nos testes
npm run typecheck                # checa os tipos do TypeScript
npm test                         # roda os testes
npm run report                   # abre o relatório HTML da última execução
```
