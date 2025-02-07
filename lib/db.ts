const { USERNAME, PASSWORD } = process.env;

if (!USERNAME || !PASSWORD) {
  throw new Error("Database credentials are missing");
}

export const connectionSrt = `mongodb+srv://sajid:Sajid@cluster0.2cwoj.mongodb.net/hachathon?retryWrites=true&w=majority&appName=Cluster0`;
