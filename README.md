# Teste datapage Node JS

### Danilo Anthony Chagas

### Nota: entrega parcial para acompanhamento

### Tasks
- [x] Task 01 - Misc | subir BD com docker e realizar uma consulta no BD
- [x] Task 02 - Misc | descrever extensões VSCode
- [x] Task 03 - API | consultar compras de um cliente por ID
- [x] Task 04 - API | Parcial/ Cadastrar um novo cliente
- [x] Task 05 - API | Atualizar cadastro de um cliente
- [x] Task 06 - API | Gerar relatório excel das vendas de todos clientes
- [x] Task 07 - API | Gerar relatório pdf das vendas de um cliente específico
- [x] Task 08 - Frontend | Realizar interface web para consumo da API
- [x] Task 09 - API | Gerar
- [ ] Task 10 - Revisão e procedimentos finais

### Instruções para iniciar projeto localmente
via terminal, na pasta raiz do projeto:
<code>npm install</code>
<code>sudo docker-compose up -d</code>
<code>npm run dev-start</code>

`consumir com Rest API Client da sua prefêrencia`

`criar e configurar .env na pasta raiz do projeto`
~~~
DB_USER = user-app
DB_PASSWORD = senha-teste-app
DB_HOST = 0.0.0.0
DB_PORT = 3306
DB_DATABASE_NAME = teste-app
~~~

[Documentação (em desenvolvimento)](https://documenter.getpostman.com/view/16227218/UVC3kTne)
</br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16227218-55c0675a-661a-4cda-aabb-b8dbb4740c1e?action=collection%2Ffork&collection-url=entityId%3D16227218-55c0675a-661a-4cda-aabb-b8dbb4740c1e%26entityType%3Dcollection%26workspaceId%3D68ac0672-2bf2-40f8-a03e-c77bc6f362eb)

<details>
<summary>Enunciado do Projeto</summary>
# Teste datapage Node JS

Olá caro desenvolvedor, nesse teste analisaremos seu conhecimento geral e inclusive velocidade de desenvolvimento. Abaixo explicaremos tudo o que será necessário.

## Instruções

Você deve desenvolver uma API e uma parte FrontEnd, utilizando Node.JS.

A escolha das bibliotecas, banco de dados, arquitetura, etc, fica a seu critério.

O código precisa rodar em macOS ou Ubuntu (preferencialmente como container Docker).

Altere o arquivo README explicando o que é preciso para rodar sua aplicação. (No final)

## Padrão

- Os locais que estiverem '???' estão aguardando você completar o comando para o sucesso do mesmo.

- Para as evidências, salvar no arquivo **evidencias.doc** (na raiz), ou semelhante, e colocar o número da atividade e os prints e informações necessárias, enviando todas em um único arquivo.

## O que será analisado

- As evidências (prints) quando atividade não gerar código e o próprio código.

- Reutilização / duplicação de código / Padrão SNORT .

- A qualidade e organização do código.

- O tempo entre o inicio da atividade e o envio para o git.

- Quantidade de acertos - Quantidade de bugs.

## Cenário

Nosso cliente tem um sistema de vendas muito básico.
Contém apenas 3 tabelas, clientes, vendas e vendas_itens. Ele nos solicitou algumas apis e um cadastro de cliente via browser.

Api para consultar dados dos clientes com suas vendas, exportando para excel e pdf e caso necessário atualizar.

E um cadastro web para criar novos clientes.

Vamos separar isto em **Atividades**.

## Instalação

- Baixar este repositório via git clone

`git clone ???`

- Após o clone, entrar na pasta e ligar o docker-compose

`docker-compose up`

## Atividades

- Não é necessário retornar o json exatamente como sugerido nos exemplos esta é apenas uma sugestão para organização / padrão.

- [Atividade 1](/atividades/atividade1.md)
- [Atividade 2](/atividades/atividade2.md)
- [Atividade 3](/atividades/atividade3.md)
- [Atividade 4](/atividades/atividade4.md)
- [Atividade 5](/atividades/atividade5.md)
- [Atividade 6](/atividades/atividade6.md)
- [Atividade 7](/atividades/atividade7.md)
- [Atividade 8](/atividades/atividade8.md)
- [Atividade 9](/atividades/atividade9.md)
- [Atividade 10](/atividades/atividade10.md)

# Parabéns

Obrigado por participar do nosso processo seletivo.
Favor entrar em contato com o responsável pelo processo seletivo.

Equipe Datapage

## Entrega

Para iniciar o teste, faça o clone, suba o projeto em seu próprio github e nos envie o link.
</details>