/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds the class called "Scholar" I will later add subclasses for it known as Fields of Study.
				Note that you will need the syntax for adding a subclass as well if you want the class to have any choices for subclasses
	Code by:  /u/Maxameano
	Date:     2019-03-30
	Code Version: 1.0
	Please support the creator of this content (Benjamin Huffman) and download their content at https://www.dmsguild.com/browse.php?author=Benjamin%20Huffman
*/

var iFileName = "Scholar.js";
RequiredSheetVersion(13);

//Now make the scholar class
ClassList["scholar"] = {
	regExpSearch : /^(?=.*scholar).*$/i,
	name : "Scholar",
	source : ["HB", 0],
	primaryAbility : "\n \u2022 Scholar: Intelligence;",
	prereqs : "\n \u2022 Scholar: Intelligence 13;",
	die : 6,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Int", "Wis"],
	skillstxt : {
		primary : "Choose three from Animal Handling, Arcana, History, Insight, Investigation, Medicine, Nature, Perception, Performance, Persuasion, Religion, and Survival.",
		secondary : "Choose one from Animal Handling, Arcana, History, Insight, Investigation, Medicine, Nature, Perception, Performance, Persuasion, Religion, and Survival.",
    },
	toolProfs : {
		primary : [["One tool of your choice", 1]],
	},
	armor : [
		[true, false, false, false],
		[true, false, false, false]
	],
	weapons : [
		[true, false, ["hand crossbow", "heavy crossbow"]],
		[true, false]
	],
	equipment : "Scholar starting equipment:\n \u2022 leather armor and a simple weapon -or- leather armor, a hand crossbow, and 20 crossbow bolts -or- a heavy crossbow and 20 crossbow bolts;\n \u2022 diplomat's pack -or- explorer's pack;\n \u2022 A book on a topic of your choice;\n \u2022 A scholar's pack and and two tools or tool kits.",
	subclasses : ["Field of Study", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

	features : {
		"academic discourse" : {
			name : "Academic Discourse",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n  " + "You have mastered the art of using 10 words where 1 would suffice. Only another creature that knows this discourse understands messages spoken or written in this language. It takes 10 times longer to convey a message in this way then it does to convey it normally."
		},
		"subclassfeature1" : {
			name : "Field of Study",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "Choose a Field of Study you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Culinarian, or Diplomat."
		},
		"sage advice" : {
			name : "Sage Advice",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "When a creature within 60ft of you who can hear you makes an ability check, attack roll, or saving throw you can use your reaction to add a bonus equal to your proficiency bonus to that roll.",
            usages : "Intelligence modifier per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : levels.map(function (n) {
					return n < 5 ? "long rest" : "short rest";
            }),
			action : ["reaction", ""]
		},
		"analyze enemy" : {
			name : "Analyze Enemy",
			source : ["HB", 0],
			minlevel : 2,
			description : "\n   " + "You can use a bonus action on each of your turns to survey a creature you can see within 60ft. For the next minute when you attack that creature, you can use your Intelligence ability modifier, instead of your Strength or Dexterity modifier, to attack and damage rolls made with weapons you are proficient with. \n Starting at 5th level, the first time you hit this creature with a weapon attack each turn, you deal additional damage as shown above.",
			additional : ["", "", "", "", "1d10", "1d10", "1d10", "1d10", "1d10", "1d10", "2d10", "2d10", "2d10", "2d10", "2d10", "2d10", "3d10", "3d10", "3d10", "3d10"],
			action : ["bonus action", ""],
			calcChanges : {
				atkCalc : [
					function (fields, v) {
						if (fields.Proficiency == true) {
						  fields.Mod = v.Int;
						};
					}
				]
			}
		},
		"erudite applications" : {
			name : "Erudite Applications",
			source : ["HB",0],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Feature\" button above to add Erudite Applications to the third page. You do not need to meet the prerequisites for the Applications you gain at 5th and 14th levels.",
			additional : ["", "2 applications known", "2 applications known", "2 applications known", "3 applications known", "3 applications known", "3 applications known", "4 applications known", "4 applications known", "4 applications known", "5 applications known", "5 applications known", "5 applications known", "6 applications known", "6 applications known", "6 applications known", "7 applications known", "7 applications known", "7 applications known", "8 applications known"],
			extraname : "Eldritch Invocation",
			extrachoices : ["Academic Expertise", "Adventurous Appetizers (prereq: Culinarian)"],

			"academic expertise" : {
				name : "Academic Expertise",
				source : ["HB",0],
				description : "\n   " + "I gain expertise with two skills out of Arcana, History, Investigation, Medecine, Nature, or Religion.",
				skillstxt : "Expertise with two skill proficiencies of Arcana, History, Investigation, Medecine, Nature, or Religion",
            },
			"adventurous appetizers (prereq: culinarian)" : {
				name : "Adventurous Appetizers",
				source : ["HB", 0],
				description : "You can spend 10 minutes preparing easy to eat appetizers. When eaten as an action, a creature regains 1d8 hitpoints plus a number of temporary hitpoints.",
                additional : ["", "1d8+1 temporary hitpoints", "1d8+1 temporary hitpoints", "1d8+2 temporary hitpoints", "1d8+2 temporary hitpoints", "1d8+3 temporary hitpoints", "1d8+3 temporary hitpoints", "1d8+4 temporary hitpoints", "1d8+4 temporary hitpoints", "1d8+5 temporary hitpoints", "1d8+5 temporary hitpoints", "1d8+6 temporary hitpoints", "1d8+6 temporary hitpoints", "1d8+7 temporary hitpoints", "1d8+7 temporary hitpoints", "1d8+8 temporary hitpoints", "1d8+8 temporary hitpoints", "1d8+9 temporary hitpoints", "1d8+9 temporary hitpoints", "1d8+10 temporary hitpoints"],
				usages : "1 + Intelligence Modifier per",
				usagescalc : "event.value = Math.max(1, 1 + What('Int Mod'));",
				recovery : "long rest"
			},
		},
		"sagacious font" : {
				name : "Sagacious Font",
				source : ["HB", 0],
				minlevel : 5,
				description : "\n   " + "I can now also recover my expended Sage Advice uses after a short rest"
        },
		"quick study" : {
				name : "Quick Study",
				source : ["HB", 0],
				minlevel : 6,
				description : "\n   " + "When I finish a long rest, I can choose a skill or tool I am not proficient with. Until I use this feature again, I am proficient with that skill or tool."
        },
		"iron will" : {
				name : "Iron Will",
				source : ["HB", 0],
				minlevel : 7,
				description : "\n   " + "You have aquired greater mental strength, and are proficient with Charisma saving throws.",
				saves : ["Int", "Wis", "Cha"]
        },
		"brilliant mind" : {
				name : "Brilliant Mind",
				source : ["HB", 0],
				minlevel : 10,
				usage : 1,
				recovery : "short rest",
				description : "\n   " + "You can reroll a failed Intelligence, Wisdom, or Charisma saving throw you failed. You must use the result of the new roll."
        },
		"reliable talent" : {
				name : "Reliable Talent",
				source : ["HB", 0],
				minlevel : 11,
				description : "\n   " + "Whenever you make an ability check that let's you add your proficiency bonus, you can treat a roll of 9 or lower on the d20 as a 10."
        },
		"expansive intellect" : {
				name : "Expansive Intellect",
				source : ["HB", 0],
				minlevel : 15,
				scores : levels.map(function (n) {
						return n < 20 ? [0,0,0,2,0,0] : [0,0,0,4,0,0];
	            }),
				description : "\n   " + "Your Intelligence score increases by 2. Additionally, your new maximum Intelligence score from ability score improvements is 22. This happens again at level 20, setting the new limit at 24."
        },
		"flash of genius" : {
				name : "Flash of Genius",
				source : ["HB", 0],
				minlevel : 18,
				usage : 1,
				recovery : "long rest",
				action : ["reaction",""],
				description : "\n   " + "After you make an ability check, attack roll, or saving throw that adds your proficieny bonus, you can use your reaction to treat the die roll as a 20."
        }
	}
};

AddSubClass("scholar", "culinarian", {
	regExpSearch : /^(?=.*culinarian)(?=.*scholar).*$/i,
	subname : "Culinary Field of Study",
	source : ["HB", 0],
	fullname : "Culinarian Scholar",
	toolProfs : {["Artisans Tools", 2]},
	features : {
		"subclassfeature1" : {
			name : "Combat Cook",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n " + "You can use cook's utensils as a simple weapon that deals 1d6 damage. Pots and pans deal bludgeoning damage and have the versatile (1d8) feature; forks deal piercing damage and have the light property; and knives deal slashing and have the thrown (20/60) property."
		},
		"subclassfeature3.1" : {
			name : "Waste Not, Want Not",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n " + "You can harvest recently deceased non-humanoid creatures for cooking ingredients. You can harvest 1 ingredient from a Medium or smaller creature, 2 ingredients from a LArge creature, and 3 from a Huge or larger creature. Harvesting an ingredient takes 1 minute, you are adept enough at preserving food that these ingredients don't go bad."
		},
		"subclassfeature3.2" : {
			name : "Culinary Craft",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n " + "When you spend 1 hour cooking, which can be done as a part of a short or long rest, you can prepare 1 + your Intelligence modifier meals, using an ingredient of yor choice. Each creature that eats one meal gains a temporary increase in hitpoints and gains one benefit of your choice. These benefits last until you eat another meal or finish a long rest.",
            additional : ["", "", "2d8 + 3 hitpoints", "2d8 + 4 hitpoints", "2d8 + 5 hitpoints", "2d8 + 6 hitpoints", "2d8 + 7 hitpoints", "2d8 + 8 hitpoints", "2d8 + 9 hitpoints", "2d8 + 10 hitpoints", "2d8 + 11 hitpoints", "2d8 + 12 hitpoints", "2d8 + 13 hitpoints + CR", "2d8 + 14 hitpoints + CR", "2d8 + 15 hitpoints + CR", "2d8 + 16 hitpoints + CR", "2d8 + 17 hitpoints + CR", "2d8 + 18 hitpoints + CR", "2d8 + 19 hitpoints + CR", "2d8 + 20 hitpoints + CR"],
			extraname : "Meal Feature",
				"resistance" : {
					name : "Resistance",
					source : ["HB", 0],
					description : "Resistance to a damage type the creature the ingredient was taken from was resistant or immune to."
				},
				"buffs" : {
					name : "Ability Buffs",
					source : ["HB", 0],
					description : "A +1 bonus to ability checks, attack rolls, and saving throws that use an ability score for which the ingredient's source has an ability score of 16 or higher."
				},
				"immunity " : {
					name : "Immunity",
					source : ["HB", 0],
					description : "Immunity to a damage type the creature the ingredient was taken from was immune to."
				},
				"improved buffs" : {
					name : "Better Buffs",
					source : ["HB", 0],
					description : "A +2 bonus to ability checks, attack rolls, and saving throws that use an ability score for which the ingredients source has an ability score of 20 or higher."
				},
				autoSelectExtrachoices : [{
					extrachoice : "resistence"
				}, {
					extrachoice : "buffs"
				}, {
					extrachoice : "immunity",
					minlevel : 9
				}, {
					extrachoice : "improved buffs",
					minlevel : 9
                }]
		},
		"subclassfeature9.2" : {
			name : "Edible Improv",
			source : ["HB", 0],
			minlevel : 9,
			description : "\n " + "When you use your Culinary Craft feature you can choose to improvise instead of providing an ingredient. When you do, treat it as if you used an ingredient from a creature with resistance to all damage types, a 20 in all abilities, and a CR equal to your Scholar level.",
			usage : 1,
			recovery : "long rest"
		},
		"subclassfeature13" : {
			name : "Full Bellies, Full Hearts",
			source : ["HB", 0],
			minlevel : 13,
			description : "\n " + "When a creature temporarily increases their hitpoints as a result of eating one of your meals, it gains additional hitpoints equal to the CR of the creature the ingredient was taken from.",
		},
		"subclassfeature20" : {
			name : "Heaping Helping",
			source : ["HB", 0],
			minlevel : 20,
			description : "\n " + "When you cook using your Culinary Craft feature, you can use 2 ingredients instead of one. If you do, you can choose two different benefits as well. You gain bonus hitpoints equal to total CR of both creatures the ingredients were taken from.",
		}
	}
});
