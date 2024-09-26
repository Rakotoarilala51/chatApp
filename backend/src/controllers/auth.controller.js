const { Prisma } = require("@prisma/client");
const prisma = require("../db/prisma");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.login = async (req, res) => {
  try {
    console.log(req.body)
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "invalid username" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "invalid password" });
    }
    generateToken(user.id, res);
    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(500);
  }
};

exports.signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    console.log(fullname, username);
    // Input validation
    if (!fullname || !username || !password || !confirmPassword || !gender) {
			return res.status(400).json({ error: "Please fill in all fields" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

    // Check if the username is already taken
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res.status(401).json({ error: "Username already taken" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Set profile pic based on gender
    const boyProfilePic = `http://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `http://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      // If the user is created successfully, return a success response
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ error: "Invalid data" });
    }
  } catch (error) {
    // Handle errors properly
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error during getMe:", error);
  res.status(500).json({ error: "Internal Server Error" });
  }
};
