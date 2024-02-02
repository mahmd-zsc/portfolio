let asyncHandler = require("express-async-handler");
const {
  Skill,
  validateCreateSkill,
  validateUpdateSkill,
} = require("../modules/Skills");

/**
 * @desc    Get All Skills
 * @route   /api/skills/
 * @method  Get
 * @access  public
 */

let getAllSkills = asyncHandler(async (req, res) => {
  let skills = await Skill.find();

  if (skills) {
    return res.status(200).json(skills);
  }
  res.status(404).json({ massage: "not found" });
});
/**
 * @desc    Create a Skill
 * @route   /api/skills/
 * @method  Post
 * @access  private
 */

let createSkill = asyncHandler(async (req, res) => {
  let { error } = validateCreateSkill(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let skills = await Skill.find({ title: req.body.title });

  if (skills.length !== 0) {
    return res.status(400).json({ message: "This skill already exists." });
  }

  let skill = new Skill({
    title: req.body.title,
    hex: req.body.hex, // Make sure to include the hex field
  });

  let result = await skill.save();
  res.status(200).json(result);
});

/**
 * @desc    update a Skill
 * @route   /api/skills/:id
 * @method  put
 * @access  private
 */

let updateSkill = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let { error } = validateUpdateSkill(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let skill = await Skill.findById(id);

  if (!skill) {
    return res.status(400).json({ message: "This skill id is not found" });
  }

  let updateSkill = await Skill.findByIdAndUpdate(
    id,
    {
      $set: {
        title: req.body.title,
        hex: req.body.hex,
      },
    },
    { new: true }
  );

  res.status(200).json(updateSkill);
});
/**
 * @desc    delete a Skill
 * @route   /api/skills/:id
 * @method  delete
 * @access  private
 */

let deleteSkill = asyncHandler(async (req, res) => {
  let { id } = req.params;

  let skill = await Skill.findById(id);

  if (!skill) {
    return res.status(400).json({ message: "This skill id is not found" });
  }

  await Skill.findByIdAndDelete(id);

  res.status(200).json({ massage: "this skill has been deleted!" });
});

module.exports = {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
