export const getHomepage = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "Homepage Loaded Successfully" });
  } catch (error) {
    console.log("Error loading Homepage: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// change the try block response order or remove the res.status.json if any error encounterd !
