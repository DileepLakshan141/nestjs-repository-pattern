# nestjs-repository-pattern

In this repository what we gonna create is create mono repo strategy based
two nest js api applications adopting the "Generic Crud Repository Pattern"

How It Works:

Base Class = A template with common CRUD operations (create, read, update, delete)
Your New Model = Extends (inherits from) the base class
Result = Your model automatically gets all CRUD methods without writing them again!

Think of it like this:

Base class is like a blueprint for a house with standard rooms (kitchen, bathroom, bedroom)
Your new model is like your custom house - you get all standard rooms FREE + you only build custom rooms you need (like a home theater or gym)

Our Learning Path:
We'll build a Task Management System step-by-step:

task-management-monorepo/
├── apps/
│ ├── api-app/ # Main API application
│ │ ├── src/
│ │ │ ├── main.ts
│ │ │ ├── app.module.ts
│ │ │ └── users/ # User module
│ │ ├── package.json
│ │ └── tsconfig.json
│ │
│ └── admin-app/ # Admin dashboard API
│ └── src/
│
├── common/ # 🌟 Shared code between apps
│ ├── orm-lib/ # Our CRUD pattern lives here!
│ │ ├── base/
│ │ │ ├── base-crud.repository.ts
│ │ │ └── crud.service.ts
│ │ ├── database/
│ │ │ └── knexfile.ts
│ │ └── index.ts
│ │
│ ├── dto/ # Shared DTOs
│ └── utils/ # Shared utilities
│
├── package.json # Root package.json
├── tsconfig.json # Root TypeScript config
├── knexfile.js # Knex configuration
└── .env # Environment variables
