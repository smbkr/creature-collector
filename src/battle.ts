import { Creature } from "./creature";

const SUPER_EFFECTIVE_MULTIPLIER = 1.5;

export function battle(a: Creature, b: Creature): Creature {
  let firstTurnOrder: [Creature, Creature] =
    Math.random() < 0.5 ? [a, b] : [b, a];

  return battleTurn(...firstTurnOrder);
}

function battleTurn(attacker: Creature, defender: Creature): Creature {
  const damage = getDamage(attacker, defender);
  defender.hp = defender.hp - damage;
  if (defender.hp > 0) {
    return battleTurn(defender, attacker);
  }

  return attacker;
}

function getDamage(attacker: Creature, defender: Creature): number {
  if (attacker.isSuperEffectiveAgainst(defender.family)) {
    return attacker.cp * SUPER_EFFECTIVE_MULTIPLIER;
  }

  return attacker.cp;
}
