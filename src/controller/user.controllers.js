const prisma = require("../db/db.config");
// Create a new user
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

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    // Handle Prisma or MongoDB errors
    if (error.code === "P2031") {
      return res.status(500).json({
        status: 500,
        success: false,
        message:
          "MongoDB needs to be configured as a replica set. Please refer to: https://pris.ly/d/mongodb-replica-set",
      });
    }
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

// Get all users
const getUserController = async (req, res) => {
  try {
    const user = await prisma.user.findMany({});

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Get user by id
const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    // Handle Prisma or MongoDB errors
    if (error.code === "P2002") {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }
    return res.status(500).json({ message: error.message });
  }
};

// Create user
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    // Handle Prisma or MongoDB errors
    if (error.code === "P2002") {
      return res.status(404).json({ message: "User not found" });
      z;
    }
    return res.status(500).json({ message: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    // Handle Prisma or MongoDB errors
    if (error.code === "P2002") {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userController,
  getUserController,
  getUserByIdController,
  deleteUserController,
  updateUserController,
};
