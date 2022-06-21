# Dev Habits

Link da Aplicação: http://habits-project-g2.vercel.app/

## Sobre o projeto
Neste projeto em equipe tivemos que desenvolver uma aplicação para gerenciamento de hábitos pessoais e também em grupos com atividades e metas compartilhadas. Fazendo o uso e a manipulação de uma API Rest, em duas semanas a partir da metodologia Scrum e fazendo o uso de Kanban com a plataforma Trello fizemos o planejamento do projeto com a equipe, todo o design via Figma e a partir disso desenvolvemos do zero todas as funcionalidades.

## Funcionalidades Presentes

### Cadastro
A partir de um usuário, email e senha você pode se cadastrar na aplicação para fazer o uso das funcionalidades internas. Para essa parte foram usadas tecnologias como React Hookform, yup e axios para todas as requisições.

### Login
Aqui é possível completar os campos com seu nome e senha cadastrados, e com isso entrar de fato na aplicação via token de autenticação gerado pela API.

Para facilitar o processo, pode ser usado o usuário e senha a seguir:<br>
<strong>usuário</strong>: rafaelsc<br>
<strong>senha</strong>: 123456<br>

### Hábitos
Nessa página você pode cadastrar novos hábitos na aplicação especificando Título, Categoria, Dificuldade e Frequência da atividade que pretende monitorar, após isso, será exibido na lista de hábitos cadastrados seu novo hábito. Depois conforme o andamento da atividade você pode ir marcando o check-in na atividade de forma que fique registrado o progresso da mesma, ou então excluir ela por completo.

### Grupos
Através da barra lateral, você pode acessar a aba dos grupos, nessa página existe um campo para criação de novos grupos e visualização deles. A partir da barra de pesquisa um grupo esécífico pode ser encontrado e nele você pode se inscrever para fazer parte dos membros do grupo e também pode acessar as informações específicas dele clicando em "Ver Grupo".

#### -> Dentro do Grupo
Dentro do grupo são apresentadas diversas informações como: o título, categoria e descrição, seus membros, suas metas e também suas atividades ambas podendo ser criadas e deletadas, além de serem completáveis também.
