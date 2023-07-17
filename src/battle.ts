import { Creature, Family } from "./creature";

const SUPER_EFFECTIVE_MULTIPLIER = 1.5;

// Map of attacker -> families it is super effective against
const SUPER_EFFECTIVE_MAP = {
  [Family.Flyer]: [Family.Runner, Family.Swimmer],
  [Family.Swimmer]: [Family.Climber],
  [Family.Runner]: [Family.Swimmer],
  [Family.Climber]: [Family.Flyer],
};

export function battle(a: Creature, b: Creature): Creature {
  let firstTurnOrder: [Creature, Creature] =
    Math.random() < 0.5 ? [a, b] : [b, a];

  return battleTurn(...firstTurnOrder);
}

function battleTurn(attacker: Creature, defender: Creature): Creature {
  defender.hp = defender.hp - attacker.cp;
  if (defender.hp > 0) {
    return battleTurn(defender, attacker);
  }

  return attacker;
}
