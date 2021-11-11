# Atividade 6

- [x] Fazer a atualização na rota Gerar Vendas /cliente/${cliente}/gerar-vendas?formato=excel para gerar um excel com as colunas abaixo:
      **Cliente Nome, Codigo Nota fiscal, Data Venda, Valor Total (Colunas do excel)**

\*\*Irá gerar as venda de apenas um cliente

Exemplo de retorno

```
{
    msg: "Ok excel gerado ",
    erro: 0,
    dados: {
        url: "/arquivos/arquivo.xlsx"
    }
}
```

Ai ao executar a rota https://localhost:7081/arquivos/arquivo.xlsx ele retorna o download do excel

(Evidências no evidencia.doc)

- [x] - Retorno json da criação do excel
- [x] - Print do excel gerado aberto

---

Fim atividade 6
