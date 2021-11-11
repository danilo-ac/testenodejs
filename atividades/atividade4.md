# Atividade 4

- [x] Fazer a rota POST /cliente/  salvar os dados de um cliente com os campos(nome,telefone,cpf) da tabela (cliente).
E retornar qual foi o ID inserido.

```
{
    msg: "Cliente inserido com sucesso",
    erro: 0,
    dados: {
        id: 6,
        nome: "Maria"
    }
}
```

- [x] - Caso não enviar o o CPF completo, com mascara, não deve salvar.

```
{
    msg: "CPF não enviado corretamente",
    erro: 1,
    dados: [{
        mensagem: "CPF não enviado corretamente"
    }]
}
```

(Evidências no evidencia.doc)

- [x] - Criação do Cliente : nome Renata / Cpf 123.123.123-12 /  Telefone (62) 98112-1233
- [x] - Exception enviando um cpf com 111.123.123

---
Fim atividade 4