

exports.handles400s = (err, req, res, next) => {
    // Err codes that signal a bad request
    const codes = ["22P02", "42703", "23503", "23502"];
    if (codes.includes(err.code)) {
      res.status(400).send({ msg: "Bad request" });
    } else {
      next(err);
    }
};
  
exports.handlesCustoms = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ msg: err.msg });
    } else {
        next(err);
    }
}

exports.handles500s = (err, req, res, next) => {
    res.status(500).send({ msg: "Server error!" });
};

exports.handles405s = (req, res, next) => {
    res.status(405).send({ msg: "Invalid method used" });
};s