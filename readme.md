## Prisma CRUD

This is a CRUD application that uses Prisma ORM to connect to MongoDB.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm run dev
```

### 3. Open the App

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Learn More

To learn more about Prisma, take a look at the following resources:

- [Prisma Documentation](https://pris.ly/d/index) - learn about Prisma.
- [Prisma Tutorial](https://pris.ly/d/tutorial) - start building Prisma projects in 10 minutes.
- [Prisma Deployment](https://pris.ly/d/deployment) - learn how to deploy your Prisma project to a server.
- [Prisma Client](https://pris.ly/d/client) - learn how to use the Prisma client in your TypeScript, JavaScript or Python project.

## প্রিজমা এবং MongoDB ব্যবহার করে CRUD অপারেশন

**একটি বিগিনার-ফ্রেন্ডলি গাইড**

---

## পরিচিতি

এই রিপোজিটরিতে MongoDB ডাটাবেসের সাথে প্রিজমা (Prisma) ORM ব্যবহার করে CRUD (Create, Read, Update, Delete) অপারেশন বাস্তবায়নের পূর্ণাঙ্গ গাইড ও উদাহরণ রয়েছে। এই গাইডটি বিশেষভাবে বিগিনারদের জন্য তৈরি করা হয়েছে যারা প্রিজমা শিখতে চান।

---

## প্রাক-প্রয়োজনীয়তা

- Node.js এবং npm ইন্সটল করা থাকতে হবে।
- MongoDB অ্যাকাউন্ট ও কানেকশন স্ট্রিং (অথবা লোকাল MongoDB)।
- Express.js সম্পর্কে বেসিক ধারণা।

---

## ইন্সটলেশন

### ১. প্রোজেক্ট সেটআপ

প্রথমে একটি নতুন Node.js প্রোজেক্ট তৈরি করুন:

```bash
mkdir prisma-mongodb-crud
cd prisma-mongodb-crud
npm init -y
```

### ২. প্রিজমা এবং Express ইন্সটল করুন

```bash
npm install prisma @prisma/client express
```

### ৩. প্রিজমা ইনিশিয়ালাইজ করুন

```bash
npx prisma init
```

এই কমান্ডটি `prisma/schema.prisma` ফাইল তৈরি করবে।

---

## কনফিগারেশন

### MongoDB কানেকশন সেটআপ

`prisma/schema.prisma` ফাইলটি এডিট করুন:

```prisma
datasource db {
  provider = "mongodb"
  url      = "mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/mydb?retryWrites=true&w=majority"
}
**
// Remember you must me add your atlas cluster url here.
// Don't add your local mongodb url here.
// If you're using a local mongodb URL, Prisma will not be able to connect to your database.
**
generator client {
  provider = "prisma-client-js"
}
```

---

## মডেল ডিফাইনেশন

একটি `User` মডেল যোগ করুন `schema.prisma`-তে:

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
  age   Int
}
```

---

## মাইগ্রেশন রান করুন

সস্কীমা MongoDB-এ সিঙ্ক করুন:

```bash
npx prisma db push
```

---

## CRUD অপারেশন

### সার্ভার সেটআপ (`index.js`)

```
javascript
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("সার্ভার চালু হয়েছে: http://localhost:3000");
});
```

### ১. ইউজার তৈরি (POST)

```javascript
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ডেটা তৈরি করতে সমস্যা!" });
  }
});
```

### ২. সব ইউজার পড়ুন (GET)

```javascript
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "ডেটা ফেচ করতে সমস্যা!" });
  }
});
```

### ৩. আইডি দিয়ে ইউজার পড়ুন (GET by ID)

```javascript
app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ইউজার খুঁজে পাওয়া যায়নি!" });
  }
});
```

### ৪. ইউজার আপডেট (PUT)

```javascript
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "আপডেট করতে সমস্যা!" });
  }
});
```

### ৫. ইউজার ডিলিট (DELETE)

```javascript
app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "ইউজার ডিলিট করা হয়েছে!" });
  } catch (error) {
    res.status(500).json({ error: "ডিলিট করতে সমস্যা!" });
  }
});
```

---

## সার্ভার চালু করুন

```bash
node index.js
```

---

## ট্রাবলশুটিং

### কমন Errors এবং সমাধান

- **কানেকশন Error**: MongoDB URL, ইউজারনেম, পাসওয়ার্ড চেক করুন।
- **Schema Mismatch**: `npx prisma db push` রান করুন।
- **ইউনিক কনস্ট্রেইন্ট Error**: একই ইমেইল দিয়ে ইউজার তৈরি করবেন না।

---

## কন্ট্রিবিউট

প্রশ্ন বা সাজেশন থাকলে ইস্যু তৈরি করুন অথবা পুল রিকুয়েস্ট পাঠান।

---

## লাইসেন্স

[MIT](LICENSE)

এই `README.md` ফাইলটি আপনার প্রোজেক্টের রুট ফোল্ডারে সেভ করুন এবং প্রয়োজনমতো এডিট করুন! 😊
