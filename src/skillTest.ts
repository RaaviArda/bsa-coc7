
class SkillTest implements TestClass<"skill"|"difficulty"> {
    public type:string =  "SkillTest"
    _choices:{[key:string]:{text:string, img?:string}} = {};
    constructor(){
        this._choices = beaversSystemInterface.configSkills.reduce((object, skill) => {
            object[skill.id] = { text: skill.label };
            return object;
        }, {})
    }
    public create(data:Record<"skill"|"difficulty",any>){
        const result = new SkillTestCustomized();
        result.data = data;
        result.parent = this;
        return result;
    }
    public informationField:InfoField = {
        name: "type",
        type: "info",
        label: game['i18n'].localize("beaversSystemInterface.tests.skillTest.info.label"),
        note: game['i18n'].localize("beaversSystemInterface.tests.skillTest.info.note")
    }

    get customizationFields(): Record<"difficulty"|"skill",InputField>{
        return {
            skill: {
                name: "skill",
                label: "skill",
                note: "Skill",
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
        };
    }

}

class SkillTestCustomized implements Test<"skill"|"difficulty"> {

    parent: SkillTest
    data = {difficulty:0,skill:""}

    public action = async (initiatorData: InitiatorData):Promise<TestResult> => {
        const actor = beaversSystemInterface.initiator(initiatorData).actor;
        const skillValue = actor.system.skills[this.data.skill] + this.data.difficulty;
        const roll = await new Roll('1d100').roll();
        const rollResult = roll._total;

        return {
            success:roll.total<=skillValue?1:0,
            fail: roll.total>skillValue?1:0
        }
    }

    public render = (): string => {
        const skill = this.parent._choices[this.data.skill]?.text||"process";
        return `${skill}:difficulty ${this.data.difficulty}`;
    };

}

beaversSystemInterface.registerTestClass(new SkillTest());