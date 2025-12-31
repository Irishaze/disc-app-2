export const validateUser = (req, res, next) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({
      error: "first_name, last_name, and email are required",
    });
  }

  next();
};
