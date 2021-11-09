# Atividade 5

- [x] Fazer a rota PUT /cliente/{cliente}  para atualizar o nome da Renata para "Juliana"


```
{
    msg: "Cliente atualizado com sucesso",
    erro: 0,
    dados: {
        id: ???,
        nome: "Juliana"
    }
}
```

- [x] - Caso não enviar o o CPF completo, com mascara, não deve salvar.

```
{
    msg: "CPF não enviado corretamente",
    erro: 1,
    dados: [{
        mensagem: "CPF não enviado corretamente 111.123.123"
    }]
}
```

- [x] - Caso não encontrar o cliente.

```
{
    msg: "Cliente não encontrado ",
    erro: 1,
    dados: [{
        mensagem: "Cliente não encontrado id: 15"
    }]
}
```

(Evidências no evidencia.doc)

- [x] - Atualização do Cliente : nome Juliana 
- [x] - Exception enviando um cpf com 111.123.123
- [x] - Exception do cliente não encontrado id 15

---
Fim atividade 5