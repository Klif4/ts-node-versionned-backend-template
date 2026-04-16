export default {
  require: ["tests/bdd/support/**/*.ts", "tests/bdd/steps/**/*.ts"],
  requireModule: ["tsx"],
  paths: ["tests/bdd/features/**/*.feature"],
  format: ["progress-bar", "html:reports/cucumber.html"],
};