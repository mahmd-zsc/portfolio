let express = require("express");
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillCtrl");
let router = express.Router();

router.route("/").get(getAllSkills).post(createSkill);
router.route("/:id").put(updateSkill).delete(deleteSkill);
module.exports = router;
