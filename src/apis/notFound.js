const notFound = (app) => {
  app.all("*", (req, res) => {
    return res.status(404).json({ title: "Error 404", message: "Not Found" });
  });
};

module.exports = notFound;
