
/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://ai-interview_owner:XJqMFS7aho1I@ep-muddy-pond-a5n3leub.us-east-2.aws.neon.tech/ai-interview?sslmode=require",
  }
};