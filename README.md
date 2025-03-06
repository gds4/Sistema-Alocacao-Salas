# Sistema de Alocacao de Salas

Sistema distribuído para gerenciamento de alocação de salas em instituições de ensino, composto por microsserviços Spring Boot e frontend React/Vite.

## Tecnologias

- **Backend:** Java 17, Spring Boot 3.4.2, Spring Cloud Gateway, Eureka Server
- **Banco de Dados:** PostgreSQL (um para cada microsserviço)
- **Mensageria:** RabbitMQ (Docker)
- **Frontend:** React.js + Vite
- **Containerização:** Docker e Docker Compose

## Microsserviços

| Serviço             | Porta    | Descrição                  | Dependências         |
| ------------------- | -------- | -------------------------- | -------------------- |
| Eureka Server       | 8081     | Registro de microsserviços | -                    |
| API Gateway         | 8082     | Roteamento de requisições  | Eureka               |
| Frontend            | 5173     | Interface web              | Gateway              |
| RabbitMQ Management | 15672    | Interface de administração | -                    |
| Usuários MS         | Variável | Gerenciamento de usuários  | Eureka, DB, RabbitMQ |
| Salas MS            | Variável | Gerenciamento de salas     | Eureka, DB, RabbitMQ |
| Aulas MS            | Variável | Gerenciamento de aulas     | Eureka, DB, RabbitMQ |
| Turmas MS           | Variável | Gerenciamento de turmas    | Eureka, DB, RabbitMQ |
| Notificações MS     | Variável | Envio de notificações      | Eureka, DB, RabbitMQ |

### Dependências principais por microsserviço:

**usuarios-ms**
- Spring Data JPA
- Spring Validation
- Spring Web
- Spring Security
- Java JWT (versão 4.4.0)
- Spring Cloud Eureka Client
- Spring Boot AMQP
- PostgreSQL Driver
- Springdoc OpenAPI (versão 2.6.0)

**turmas-ms**
- Spring Data JPA
- Spring Validation
- Spring Security
- Spring Web
- Java JWT (versão 4.4.0)
- Spring Cloud Eureka Client
- Spring Boot AMQP
- Springdoc OpenAPI (versão 2.6.0)
- PostgreSQL Driver

**salas-ms**
- Spring Data JPA
- Spring Validation
- Spring Web
- Spring Security
- Java JWT (versão 4.4.0)
- Spring Cloud Eureka Client
- Spring Boot AMQP
- Springdoc OpenAPI (versão 2.6.0)
- PostgreSQL Driver

**notificacoes-ms**
- Spring Data JPA
- Spring Mail
- Spring Web
- Spring Boot AMQP
- Spring Cloud Eureka Client
- PostgreSQL Driver

**gateway**
- Spring Cloud Gateway
- Spring Cloud Eureka Client

**eurekaServer**
- Spring Cloud Netflix Eureka Server

**aulas-ms**
- Spring Data JPA
- Spring Validation
- Spring Web
- Spring Cloud Eureka Client
- Java JWT (versão 4.4.0)
- Spring Security
- PostgreSQL Driver
- Spring Boot AMQP
- Springdoc OpenAPI Starter

## Bancos de Dados

Cada microsserviço tem seu próprio banco de dados PostgreSQL:

| Serviço      | Porta | Banco de Dados   |
| ------------ | ----- | ---------------- |
| Usuários     | 5433  | usuarios\_db     |
| Salas        | 5434  | salas\_db        |
| Aulas        | 5435  | aulas\_db        |
| Turmas       | 5436  | turmas\_db       |
| Notificações | 5437  | notificacoes\_db |

## Pré-requisitos

- Java 17 (para desenvolvimento local)
- Maven 3.9+ (para desenvolvimento local)
- Node.js 18+ (para desenvolvimento frontend)
- PostgreSQL (para execução local sem docker-compose)
- RabbitMQ  (para execução local sem docker-compose, executando via container)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/gds4/Sistema-Alocacao-Salas.git
   cd Sistema-Alocacao-Salas
   ```
2. Construa as imagens Docker:
   ```bash
   docker-compose build
   ```

## Execução

### Usando Docker Compose

Para iniciar todos os serviços:

```bash
docker-compose up -d
```

Para parar os serviços:

```bash
docker-compose down
```

### Executando localmente (sem Docker Compose)

Se desejar executar os microsserviços localmente, siga os passos abaixo:

1. Instale o PostgreSQL e crie um banco de dados chamado `sistema-alocacao`.
2. Inicie manualmente o RabbitMQ em um container:
   ```bash
   docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
   ```
3. Inicie os microsserviços individualmente via IDE ou terminal com `mvn spring-boot:run`.

## Acesso ao Sistema

Para acessar o sistema utilize as seguintes credenciais:

Usuário Admin:

- login: projetopweb091@gmail.com
- senha: 123456

## Documentação da API

Acesse via Swagger UI após iniciar os serviços:

```
http://localhost:8082/<microsservico>/swagger-ui.html
```

Exemplo para Usuários:

```
http://localhost:8082/usuarios-ms/swagger-ui.html
```

## Estrutura do Projeto

```
.
├── eurekaServer/          # Servidor de Service Discovery
├── gateway/               # API Gateway
├── usuarios-ms/           # Microsserviço de Usuários
├── salas-ms/              # Microsserviço de Salas
├── aulas-ms/              # Microsserviço de Aulas
├── turmas-microservice/   # Microsserviço de Turmas
├── notificacoes-ms/       # Microsserviço de Notificações
├── sistema-alocacao-salas # Frontend React
└── docker-compose.yml     # Configuração Docker
```