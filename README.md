//Configuração de Query

====> Rota - Filtro <=======

- Devera ser passada em JSON;
- Inicia com  /?constraints={Dados Banco de dados};
EX=>{"EMPRESA": "xxxxwww","NOME": "ppeeerrcx pppp","NASC":  "4444444","SALA": "true"}

EX=> Tem que ser passado assim => /?constraints={"NOME":"cARLOS"}  // /?constraints={"NOME":"thiago","SALA":"true"}

-senao passar nenum filtro ele retorna todo banco de dados

**podemos usar todos os filtro que o mongoDB fornece segue a documentação

===> Rota atualizar <====

//*Atualizar dados no banco com -PUT => dados completos ou PATCH => dados personalizado

-Passamos o ID localizador e depois o objeto a ser atualizado;

//passamos o ID(identificador) //Usamos =&= e colocamos o prosimo
EX =>?identificador={"_id":"624f04d469ee8e14c4e79ab9"}&constraints={"EMPRESA": "xxxxwww","NOME": "ppeeerrcx pppp","NASC":  "4444444","SALA": "true"}


==========> Deletar <========

Passamos o ID localizador



====> Filtos e docs   <=========

**https://www.luiztools.com.br/post/tutorial-mongodb-para-iniciantes-em-nosql-5/

**https://www.mongodb.com/docs/drivers/node/current/

OPERAÇÃO	SINTAXE	DESCRIÇÃO
Igualdade	{"valor chave"}	Corresponde a valores que são iguais a um valor especificado.
Menor que	{“Chave”: {$ lt: ”valor”}}	Corresponde a valores inferiores a um valor especificado.
Maior que	{“Chave”: {$ gt: ”valor”}}	Corresponde a valores maiores que um valor especificado.
Menor que igual a	{“Chave”: {$ lte: ”valor”}}	Corresponde a valores que são menores ou iguais a um valor especificado.
Maior que igual a	{“Chave”: {$ lte: ”valor”}}	Corresponde a valores que são maiores ou iguais a um valor especificado.
Diferente de	{“Chave”: {$ ne: “valor”}}	Corresponde a todos os valores que não são iguais a um valor especificado.
E lógico	{“$ E”: [{exp1}, {exp2},…, {expN}]}	Junta cláusulas de consulta com um AND lógico retorna todos os documentos que correspondem às condições de ambas as cláusulas.
OR lógico	{“$ Ou”: [{exp1}, {<exp2},…, {expN}]}	Junta cláusulas de consulta com um OR lógico retorna todos os documentos que correspondem às condições de qualquer uma das cláusulas.
NÃO Lógico	{“$ Não”: [{exp1}, {exp2},…, {expN}]}	Inverte o efeito de uma expressão de consulta e retorna documentos que não correspondem à expressão de consulta.
