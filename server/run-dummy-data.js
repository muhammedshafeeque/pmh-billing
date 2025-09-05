#!/usr/bin/env node

/**
 * Script to populate the database with dummy data
 * Usage: node run-dummy-data.js
 */

import { createDummyData } from './create-dummy-data.js';

console.log("🚀 Starting dummy data creation script...");
console.log("⚠️  Warning: This will add sample data to your database");
console.log("📝 Make sure you're connected to the correct database\n");

createDummyData()
  .then(() => {
    console.log("\n✨ Success! Dummy data has been created successfully.");
    console.log("💡 You can now test your application with sample data.");
  })
  .catch((error) => {
    console.error("\n❌ Failed to create dummy data:", error.message);
    process.exit(1);
  });
