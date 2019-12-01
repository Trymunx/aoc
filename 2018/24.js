const exampleInput = `Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;
const input = `Immune System:
3916 units each with 3260 hit points with an attack that does 8 radiation damage at initiative 16
4737 units each with 2664 hit points (immune to radiation, cold, bludgeoning) with an attack that does 5 slashing damage at initiative 13
272 units each with 10137 hit points with an attack that does 331 slashing damage at initiative 10
92 units each with 2085 hit points (immune to fire) with an attack that does 223 bludgeoning damage at initiative 1
126 units each with 11001 hit points (immune to bludgeoning; weak to cold, fire) with an attack that does 717 bludgeoning damage at initiative 8
378 units each with 4669 hit points (immune to cold, slashing) with an attack that does 117 fire damage at initiative 17
4408 units each with 11172 hit points (immune to slashing; weak to bludgeoning) with an attack that does 21 bludgeoning damage at initiative 5
905 units each with 11617 hit points (weak to fire) with an attack that does 100 fire damage at initiative 20
3574 units each with 12385 hit points (weak to bludgeoning; immune to radiation) with an attack that does 27 radiation damage at initiative 19
8186 units each with 3139 hit points (immune to bludgeoning, fire) with an attack that does 3 bludgeoning damage at initiative 9

Infection:
273 units each with 26361 hit points (weak to slashing; immune to radiation) with an attack that does 172 radiation damage at initiative 18
536 units each with 44206 hit points (weak to fire, cold) with an attack that does 130 bludgeoning damage at initiative 12
1005 units each with 12555 hit points (immune to fire, radiation, bludgeoning) with an attack that does 24 radiation damage at initiative 6
2381 units each with 29521 hit points (immune to bludgeoning, radiation) with an attack that does 23 slashing damage at initiative 4
5162 units each with 54111 hit points (weak to radiation) with an attack that does 19 fire damage at initiative 2
469 units each with 45035 hit points (weak to fire, slashing) with an attack that does 163 radiation damage at initiative 15
281 units each with 23265 hit points (weak to slashing; immune to bludgeoning) with an attack that does 135 radiation damage at initiative 11
4350 units each with 46138 hit points (weak to fire) with an attack that does 18 bludgeoning damage at initiative 14
3139 units each with 48062 hit points (immune to bludgeoning, slashing, fire; weak to cold) with an attack that does 28 bludgeoning damage at initiative 3
9326 units each with 41181 hit points (weak to fire, bludgeoning) with an attack that does 8 cold damage at initiative 7`;
const addAffinity = (affinity, groups) => groups.map(group => ({ ...group, affinity }));
const parseInput = (input) => {
    const armies = input.split("\n\n");
    if (armies.length !== 2)
        throw new Error(`Got ${armies.length} armies.`);
    const [immuneSystemStrings, infectionStrings] = armies.map(army => army.split("\n").filter(line => line.match(/\d+ units/)));
    const immuneSysGroups = addAffinity("Immune System", immuneSystemStrings.map(parseGroup));
    const infectionGroups = addAffinity("Infection", infectionStrings.map(parseGroup));
    return { immuneSysGroups, infectionGroups };
};
const parseGroup = (s) => {
    const units = parseInt(s.match(/(\d+) units/)[1]);
    const hp = parseInt(s.match(/(\d+) hit points/)[1]);
    const weaknessesString = s.match(/weak to ((?:[a-z]+,? ?)+)/);
    const weaknesses = weaknessesString && weaknessesString.length >= 2 ? weaknessesString[1].split(", ") : undefined;
    const immunitiesString = s.match(/immune to ((?:[a-z]+,? ?)+)/);
    const immunities = immunitiesString && immunitiesString.length >= 2 ? immunitiesString[1].split(", ") : undefined;
    const damageMatch = s.match(/(\d+) ([a-z]+) damage/);
    const damage = {
        amount: parseInt(damageMatch[1]),
        type: damageMatch[2],
    };
    const initiative = parseInt(s.match(/initiative (\d+)/)[1]);
    const effectivePower = units * damage.amount;
    return { units, hp, damage, initiative, weaknesses, immunities, effectivePower };
};
const orderGroupsForTargeting = (...groups) => groups.sort((a, b) => {
    const diff = b.effectivePower - a.effectivePower;
    if (diff === 0)
        return b.initiative - a.initiative;
    else
        return diff;
});
const orderTargetPairsForAttacking = (tps) => tps.sort((a, b) => b[0] - a[0]);
const chooseTargets = ({ targetingOrder, immuneSysGroups, infectionGroups }) => {
    let remainingImmuneSysGroups = [...immuneSysGroups];
    let remainingInfectionGroups = [...infectionGroups];
    const targetPairs = [];
    let tp;
    for (const group of targetingOrder) {
        switch (group.affinity) {
            case "Immune System":
                tp = selectTarget(group, remainingInfectionGroups);
                targetPairs.push(tp.targetPair);
                remainingInfectionGroups = tp.remainingDefenders;
                break;
            case "Infection":
                tp = selectTarget(group, remainingImmuneSysGroups);
                targetPairs.push(tp.targetPair);
                remainingImmuneSysGroups = tp.remainingDefenders;
                break;
        }
    }
    return targetPairs;
};
const selectTarget = (attacker, defenders) => {
    let bestTarget = {
        target: undefined,
        damage: 0,
    };
    for (const target of defenders) {
        const damage = calculateDamage(attacker, target);
        // Select first on damage, then effectivePower, then units
        if (damage === bestTarget.damage) {
            if (target.effectivePower === bestTarget.target.effectivePower) {
                if (target.units > bestTarget.target.units) {
                    bestTarget.target = target;
                }
            }
            else if (target.effectivePower > bestTarget.target.effectivePower) {
                bestTarget.target = target;
            }
        }
        else if (damage > bestTarget.damage) {
            bestTarget = { target, damage };
        }
    }
    const targetPair = [attacker.initiative, bestTarget.target.initiative];
    const remainingDefenders = defenders.filter(d => d !== bestTarget.target);
    return { targetPair, remainingDefenders };
};
const groupFromNum = (allGroups, initiative) => allGroups.find(g => g.initiative === initiative);
const performAttacks = (targetPairs, allGroups) => {
    for (const pair of targetPairs) {
        const attacker = groupFromNum(allGroups, pair[0]);
        const defender = groupFromNum(allGroups, pair[1]);
        if (attacker.units <= 0 || !defender) {
            continue;
        }
        const damage = calculateDamage(attacker, defender);
        const unitsRemaining = Math.ceil((defender.units * defender.hp - damage) / defender.hp);
        console.log(defender.units, "remaining: ", unitsRemaining, "killed:", defender.units - unitsRemaining);
        // console.log("before", allGroups);
        defender.units = unitsRemaining;
        defender.effectivePower = unitsRemaining * defender.damage.amount;
        // console.log("after", allGroups);
    }
    return allGroups;
};
const calculateDamage = (attacker, defender) => {
    if (defender.immunities && defender.immunities.includes(attacker.damage.type)) {
        return 0;
    }
    if (defender.weaknesses && defender.weaknesses.includes(attacker.damage.type)) {
        return attacker.effectivePower * 2;
    }
    return attacker.effectivePower;
};
function main(input) {
    // Split input into armies (arrays of groups)
    const { immuneSysGroups, infectionGroups } = parseInput(exampleInput);
    const allGroups = [...immuneSysGroups, ...infectionGroups];
    // Targeting phase
    const targetingOrder = orderGroupsForTargeting(...immuneSysGroups, ...infectionGroups);
    const unorderedTargetPairs = chooseTargets({ targetingOrder, immuneSysGroups, infectionGroups });
    let targetPairs = orderTargetPairsForAttacking(unorderedTargetPairs);
    // Attacking phase
    performAttacks(targetPairs, allGroups);
}
main(exampleInput);
