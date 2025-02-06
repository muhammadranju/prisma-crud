const prisma = require("../db/db.config");

const userController = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Check if the email already exists
    const findEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (findEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    // Handle Prisma or MongoDB errors
    if (error.code === "P2031") {
      return res.status(500).json({
        message:
          "MongoDB needs to be configured as a replica set. Please refer to: https://pris.ly/d/mongodb-replica-set",
      });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { userController };
