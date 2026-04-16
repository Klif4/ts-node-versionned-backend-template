import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep } from "@cucumber/cucumber";

BeforeAll(function () {
  console.log("[Hook] BeforeAll — démarrage de la suite BDD");
});

AfterAll(function () {
  console.log("[Hook] AfterAll — fin de la suite BDD");
});

Before(function (scenario) {
  console.log(`[Hook] Before — début du scénario : "${scenario.pickle.name}"`);
});

After(function (scenario) {
  const status = scenario.result?.status;
  console.log(`[Hook] After — fin du scénario : "${scenario.pickle.name}" (statut : ${status})`);
});

BeforeStep(function ({ pickleStep }) {
  console.log(`[Hook] BeforeStep — "${pickleStep.text}"`);
});

AfterStep(function ({ pickleStep, result }) {
  console.log(`[Hook] AfterStep — "${pickleStep.text}" (statut : ${result?.status})`);
});
