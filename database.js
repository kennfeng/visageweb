import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// opens the database so we can actually do stuff with it
export const initDb = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  // Tables: Users, AnalysisResults, Products,
  // create a users table IF it doesn't already exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

    // create a products table IF it doesn't already exist
    await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        product_link TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // create a analysis_results table IF it doesn't already exist
    await db.exec(`
    CREATE TABLE IF NOT EXISTS analysis_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        result TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
        );
    `);

    

  return db;
};