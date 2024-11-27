const handleLogin = (req, result) => {
  const { username, password } = req.body;
  console.log(result);
  if (result.isEmpty()) {
    if (username === "cahzello" && password === "12345") {
      return {
        status: 200,
        message: "Success",
      };
    }

    return {
      status: 401,
      message: "Unauthorized",
    };
  } else {
    return {
      status: 400,
      message: "Bad Request",
    };
  }
};

module.exports = handleLogin;
