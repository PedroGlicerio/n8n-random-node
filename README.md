
<p align="center">
  <img src="https://github.com/user-attachments/assets/a567434d-5679-4ae7-8dbb-01e4807b5084" width="400">
</p>

---

## <p align="center">N8N Random Node | Onfly Desafio Técnico</p>

<p align="center">
  Este projeto é um  <b>conector personalizado para o N8N</b>, criado como desafio técnico. <br>
  Ele permite gerar números inteiros <b>aleatórios</b> usando a API do 
  <a href="https://www.random.org">Random.org</a>
</p>

---

## 📃 Filosofia do Projeto
 
Este projeto consiste em um conector personalizado desenvolvido para o N8N, com o objetivo de gerar números inteiros aleatórios utilizando a API oficial do <a href="https://www.random.org">Random.org</a>. A proposta do desafio foi construir algo simples, funcional e bem estruturado, que pudesse ser executado localmente em um ambiente Docker, permitindo fácil reprodução do ambiente e total compatibilidade com a plataforma. A filosofia do projeto é mostrar como um nó externo pode ser criado e integrado ao N8N, seguindo boas práticas de desenvolvimento, utilizando TypeScript e mantendo a organização do código clara. O conector Random possui operação única, onde recebe dois parâmetros obrigatórios, mínimo e máximo, e retorna um número aleatório válido dentro do intervalo informado. O retorno inclui ainda a data e hora da execução, além de indicar que a fonte dos números.

---

## 💻 Tech Stack

A stack utilizada foi composta pelo [Node.js 22 (LTS)](https://nodejs.org/en/download), TypeScript, N8N, [Docker](https://www.docker.com/), além da integração com a API pública do <a href="https://www.random.org">Random.org</a>. O ambiente foi configurado com um banco de dados Postgres para persistência do N8N, e o projeto pode ser facilmente executado e testado através do Docker Compose já configurado.

---

## 🎈 Como Instalar e Executar

Para executar o projeto localmente, é necessário ter instalados previamente o Node.js e o Docker. Os links oficiais de download estão abaixo:

- [Node.js 22 (LTS)](https://nodejs.org/en/download)  
- [Docker](https://www.docker.com/)  

Após instalar os requisitos, siga os passos abaixo no terminal:

```bash
# Clonar o repositório

git clone https://github.com/PedroGlicerio/n8n-random-node.git
cd n8n-random-node

# Instalar as dependências

npm install

# Compilar o código TypeScript

npm run build

# Subir o ambiente com Docker Compose

docker-compose up -d --build

# Depois que os containers subirem 

basta acessar o N8N em http://localhost:5678, autenticar com o usuário e senha definidos no docker-compose.yml e adicionar o nó Random ao fluxo.
```
---

## Demonstração

Os testes realizados demonstraram o funcionamento correto do nó. Ao executar, o resultado retornado apresenta o número aleatório gerado, o valor mínimo e máximo definidos, a data e hora da execução e a indicação de que o dado veio do Random.org. Abaixo seguem prints de tela que exemplificam o funcionamento do projeto:

## <p align="center">PAINEL N8N</p> 

<p align="center"> 
  <img src="https://github.com/user-attachments/assets/97e9deaa-09f6-4b2e-80fb-b96b48fb2b58" alt="Painel N8N" width="1919" height="930">
</p>

---

## <p align="center">PAINEL RANDOM</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/562f81e3-1089-4aa6-a322-640c4c93b785" width="1919" height="930">
</p>

---

## <p align="center">RANDOM FUNCIONANDO</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/9eafc9fa-128b-4762-8230-64a061addce8" width="1919" height="930">
</p>

---

## <p align="center">RANDOM OUTPUT</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/e24d1529-67c3-4297-8dac-a75e802f86fb" width="1919" height="930">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/0680105c-a444-4d31-b652-245e7f3a7ae0" width="1919" height="930">
</p>

--- 
## <p align="center">DOCKER</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/27309d24-9dcc-431c-a17b-c84fa6ec75ef" width="1919" height="930">
</p>

---

## Estrutura do Projeto

A estrutura do projeto foi organizada para facilitar manutenção e evolução. Dentro da pasta `custom-nodes/random` estão os diretórios `src`, contendo o código-fonte em TypeScript, e `dist`, que armazena a versão compilada para execução. Também foram incluídos arquivos de configuração como `package.json` e `tsconfig.json`, além da pasta `docs` que contém capturas de tela que demonstram o funcionamento do conector.

## Considerações Finais

Este projeto demonstra a criação de um conector personalizado para o N8N, utilizando a API do Random.org para gerar números inteiros aleatórios. Todo o desenvolvimento seguiu as melhores práticas recomendadas pelo N8N, garantindo uma estrutura organizada, código limpo e fácil manutenção. O nó implementa validações nos inputs, garantindo que apenas números válidos sejam utilizados, e fornece informações adicionais como data, hora e fonte do número gerado. A documentação e estrutura do projeto permitem que outros desenvolvedores entendam e expandam o conector facilmente. Este projeto pode servir como base para a criação de novos nodes customizados, contribuindo para automações mais robustas e confiáveis.
