```mermaid
erDiagram
    users {
        id int PK
        google_id string
        email string
        name string
        created_at datetime
        updated_at datetime
    }
    vocabularies {
        id int PK
        user_id int FK
        word string
        meaning string
        created_at datetime
        updated_at datetime
    }
    <!-- tests {
        id int PK
        user_id int FK
        vocab_id int FK
        score int
        created_at datetime
        updated_at datetime
    } -->

    users ||--o{ vocabularies: "has many"
    users ||--o{ tests: "has many"
    vocabularies ||--o{ tests: "has many"
```
