const errorHandler = (error, req, res, next) => {
  if (req.headerSent) {
    return next(error);
  }
  /*  if(error.name === "UnauthorizedError"){
    return res.status(401).json({message: "The user is not authorized"})
  }

  if(error.name === "ValicationError"){
    return res.status(401).json({message: error})
  } */
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
};

module.exports = errorHandler;
