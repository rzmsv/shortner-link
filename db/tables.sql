CREATE TABLE IF NOT EXISTS links (
        id serial PRIMARY KEY,
        shorter_link VARCHAR(50) NOT NULL,
        original_link VARCHAR(1000) NOT NULL,
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );