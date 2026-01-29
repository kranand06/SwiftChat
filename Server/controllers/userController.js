//Signup new user controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    
    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      userData: newUser,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Login existing user controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "New User" });
    }
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      userData: user,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//controller to check user is authentication
export const checkAuth = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

//Update user profile controller
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, profilepic } = req.body;
    const userId = req.user._id;

    var updatedUser;

    if (!profilepic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, bio },
        { new: true },
      );
    } else {
      // Upload new profile picture to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(profilepic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          bio,
          profilepic: uploadResult.secure_url,
        },
        { new: true },
      );
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
