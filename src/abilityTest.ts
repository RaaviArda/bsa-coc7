
class AbilityTest implements TestClass<"ability"|"difficulty"> {
    public type= "AbilityTest";
    _choices:{[id:string]:{text:string,img?:string}} = {}
    constructor(){
        this._choices = beaversSystemInterface.configAbilities.reduce((object, ability) => {
            object[ability.id] = { text: ability.label };
            return object;
        }, {})
    }
    create(data:Record<"ability"|"difficulty",any>){
        const result = new AbilityTestCustomized();
        result.data = data;
        result.parent = this;
        return result;
    }
    public informationField:InfoField = {
        name: "type",
        type: "info",
        label: game['i18n'].localize("beaversSystemInterface.tests.abilityTest.info.label"),
        note: game['i18n'].localize("beaversSystemInterface.tests.abilityTest.info.note")
    }

    public get customizationFields(): Record<"ability"|"difficulty",InputField>{
        return {
            ability: {
                name: "ability",
                label: "ability",
                note: "Ability",
                type: "selection",
                choices: this._choices
            },
            difficulty: {
                name: "difficulty",
                label: "difficulty",
                note: "Difficulty modifier ",
                defaultValue: 0,
                type: "number",
            }
        }
    }

}

class AbilityTestCustomized implements Test<"ability"|"difficulty"> {

    parent: AbilityTest;
    data={difficulty:0,ability:""}

    public action = async (initiatorData: InitiatorData):Promise<TestResult> => {
        const actor = beaversSystemInterface.initiator(initiatorData).actor;
        const abilityValue = actor.system.skills[this.data.ability] + this.data.difficulty;
        const roll = await new Roll('1d100').roll();
        const rollResult = roll._total;

        return {
            success:roll.total<=abilityValue?1:0,
            fail: roll.total>abilityValue?1:0
        }
    }

    public render = (): string => {
        const ability = this.parent._choices[this.data.ability]?.text||"process";
        return `${ability}:difficulty ${this.data.difficulty}`;
    };

}

beaversSystemInterface.registerTestClass(new AbilityTest());