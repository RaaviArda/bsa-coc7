import {CUSTOM_SKILLS, NAMESPACE} from "./CoC7Settings.ts";

export class CoC7 implements SystemApi {

    get version() {
        return 2;
    }

    get id() {
        return "CoC7";
    }
    async actorRollSkill(actor, skillId){
        let skill = actor.system.skills[skillId];
        if(!skill){
            ui.notifications?.error("skill not found on actor");
        }
        const message = await actor.skillCheck(skillId,true,{});
        if(!message){
            return null
        }
        return message.callbackResult;
    }

    async actorRollAbility(actor, abilityId){
        const message =  await actor.characteristicCheck(abilityId,true);
        if(!message){
            return null
        }
        return message.callbackResult;
    }

    actorCurrenciesGet(actor):Currencies {
        return {"SP":parseInt(actor.system.monetary.cash)};
    }

    async actorCurrenciesStore(actor, currencies: Currencies): Promise<void> {
        await actor.update({"system.monetary.cash": currencies["SP"]});
    }

    actorSheetAddTab(sheet, html, actor, tabData:{ id: string, label: string, html: string }, tabBody:string):void {
        const tabs = $(html).find('nav[data-group="primary"]');
        const tabItem = $('<div class="tab tab-green"><a class="tab-label" data-tab="' + tabData.id + '" data-group="primary">' + tabData.label + '</a></div>');
        tabs.append(tabItem);
        const body = $(html).find(".sheet-body");
        const tabContent = $('<div class="tab ' + tabData.id + '" data-group="primary" data-tab="' + tabData.id + '"></div>');
        body.append(tabContent);
        tabContent.append(tabBody);
    }

    itemSheetReplaceContent(app, html, element):void {
        html.find('.sheet-navigation').remove();
        var properties = html.find('.item-properties').clone();
        const sheetBody = html.find('.sheet-body');
        sheetBody.addClass("flexrow");
        sheetBody.empty();
        sheetBody.append(properties);
        sheetBody.append(element);
    }

    get configSkills():SkillConfig[] {
        const customSkillString:String = game[NAMESPACE].Settings.get(CUSTOM_SKILLS) || "";
        const skills = Object.entries(CONFIG["COC7"].skills).map(skills => {
            return {
                id: skills[0],
                label: skills[1] as string
            };
        })
        customSkillString.split(",").forEach(skill=>{
            skills.push({id:skill.trim(), label:skill.trim()})
        });
        return skills;
    }

    get configAbilities():AbilityConfig[] {
        return Object.entries(CONFIG["COC7"].abilities).map(ab => {
            return {
                id: ab[0],
                label:ab[1] as string
            };
        });
    }

    get configCurrencies():CurrencyConfig[] {
        return [
            {
                id: "SP",
                factor: 1,
                label: "SP",
            }
        ]
    }

    get configCanRollAbility():boolean {
        return true;
    }
    get configLootItemType(): string {
        return "item";
    }

    get itemPriceAttribute(): string {
        return "system.weight";
    }

    get itemQuantityAttribute(): string {
        return "system.quantity";
    }

}