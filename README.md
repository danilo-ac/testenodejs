# Teste datapage Node JS

### Danilo Anthony Chagas

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
- [x] Task 10 - Revisão e procedimentos finais

### Instruções para iniciar projeto localmente
via terminal, na pasta raiz do projeto:
<code>sudo docker-compose up -d</code>

#### portas
- API:   3003
- App:   3000/cliente/cadastro
- DB:    3306

***consumir com Rest API Client da sua prefêrencia***</br>
***contudo disponibilizei a documentação e a coleção no Postman para pronta utilização:***</br>
[Documentação](https://documenter.getpostman.com/view/16227218/UVC3kTne)
</br></br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16227218-55c0675a-661a-4cda-aabb-b8dbb4740c1e?action=collection%2Ffork&collection-url=entityId%3D16227218-55c0675a-661a-4cda-aabb-b8dbb4740c1e%26entityType%3Dcollection%26workspaceId%3D68ac0672-2bf2-40f8-a03e-c77bc6f362eb)

### pontos para melhorias e demais notas
- validação dos paramns e body request para evitar valores que não servem ou podem quebrar aplicação;
    - tenho um estudo inicial [aqui](https://github.com/future4code/Danilo-Chagas/blob/834f5ceb4af16bf4871acabc440f05e9eabf1e71/semana18/projeto_BackEnd_LabeCommerce/src/endpoint/validation/validationCreateUser.ts) onde venho desde então aprimorando uma função de múltipla validação, para ser mais reutilizável, rápida adaptação e manutenção, onde a manipulação seria somente em **expectedObject**, **checkers** e **expectedValues**, sendo que na linhas 63 em diante haveria uma operação mais automatizada, e ao fim traria mais informações ao front em caso de inconformidade com as requisições, evitando tentantivas demasiadas e visando uma economia de processamento em sentido mais amplo; 
- Geração do arquivo xlsx e pdf podem ser aprimorados, assim como o código pode ser otimizado para atendar demandas mútiplas. Além disso, é possívl aprimorar o endpoint para gerar um link único e com o nome do arquivo mais condizente (evitando fazer um download de arquivo antigo ou equivocado)
    - pensei em combinar bcrypt com jwtoken para gerar um link hasheado, e este conteria a informação criptografada do nome do arquivo e validade de acesso, assim o endpoint de download poderia saber exatamente qual é o arquivo certo para entregar ao usuário;
- o endpoint de edição de um cliente deliberei que o campo do cpf seria somente para condição de edição, mas não para alteração em si.
- repositório de business e retornos da camada de database podem ser aprimorados para melhor atender business;
- mensagens de erros podem ser concentradas em modelo/repositorio para facilitar a manuntenção e desenvolvimento
- tentei aplicar amplamente os tipos visando rápida manutenção no código em caso de alteção dos nomes das propriedades para que objetos que compartilhem referências em comum sejam automaticamente atualizados;
- busquei seguir ao máximo o template de resultados em json indicados nos enunciados
- é a primeira vez que estou usando o docker de fato, então provavelmente as configurações não são das melhores, mas funciona!

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