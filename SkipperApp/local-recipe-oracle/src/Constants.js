// culture minister from sea of thieves, pirates of the carribean
export const cultureMinisterSynonyms = [
  "Chronicler o'coves",
  "Quartermaster of Legends",
  "Cartographer of Curiosities",
  "Rum-soaked Historian",
  "Bosun o' Ballads",
  "Quartermaster of Curiosities",
  "Keeper of Mythos & Mischief"
  ];

// What to tell, Prefix Gonzo-Story with "Arrr,..."
export const cultureMinisterTopic = [
  "tall tale",
  "hidden treasure",
  "half true legend",
  "tavern gossip",
  "sea monster sighting",
  "Curse",
  "Ghost Story"
  ];

// feel good minister, Partyminister
export const feelGoodMinisterSynonyms = [
  "High Admiral of Havoc",
  "Revelry Quartermaster",
  "Rum Lord",
  "Lady of Revels",
  "Bacchus of the Brig",
  "Corsair of Cornwal",
  "Boatswain of Buchanalia"
  ];

// party themes, fictional places the ship will visit and stops
export const feelGoodMinisterThemes = new Map([
  ["Matratzenlager/Sleepover-Fort", {
    props: ["Popcorn", "Pillows", "Pillowfights", "Feathers", "Soft Blankets"],
    costumes: ["Pyjama"]
  }],
  ["Arabian Nights", {
    props: ["Carpets", "Lanterns", "Hookah"],
    costumes: []
  }],
  ["Carnival Rio/Samba", {
    props: ["", ""],
    costumes: [""]
  }],
  ["Carnival Venice and The Three Musketeers: Dartagnan masked ball", {
    props: ["rapier", "masks"],
    costumes: ["juggler on table", "fancy masks"]
  }],
  ["Murder Mystery", {
    props: ["clues", "props"],
    costumes: ["Magnum PI", "Noir Detective", "The Gentlemen: Fletcher"]
  }],
  ["Cyberpunk", {
    props: ["Neon", ""],
    costumes: [""]
  }],
  ["all white", {
    props: ["", ""],
    costumes: [""]
  }],
  ["Festival Coachella, Mystic Creatures, Burning Man, SHamballah", {
    props: ["Art", "Glitter", "Mushrooms"],
    costumes: ["Flower Crown", "Rafiki", "Dinosaur"]
  }],
  ["Medieval Banquet", {
    props: ["", ""],
    costumes: ["Viking"]
  }],
  ["Karaoke", {
    props: ["", ""],
    costumes: [""]
  }],
  ["Kung Fu Hustle", {
    props: ["", ""],
    costumes: ["Landlady"]
  }],
  ["Black & Gold elegance", {
    props: ["feather boa", ""],
    costumes: ["Gatsby", "old Holywood", "Golden Gary", "Bruce Lee", "Purple Disco Machine"]
  }],
  ["Tropical Luau", {
    props: ["Fire", "Tikki", "Coconut"],
    costumes: ["Voodoo-Zombie", "Shadowrun Erzuille-Summon", "Indo Net-Fisher"]
  }],
  ["Pirate", {
    props: ["Treasure", "Pipe", "Compass, that doesnt point to North", "Jar of Dirt", "Rum Barrel", "Tattoos", "North Star"],
    costumes: ["Steve Zissou cast into Pirates of the Carribean World", "Maori", "Kraken fighter", "Whaler-Harpoonist", "Bioluminescent Dolphin", "Nat Pagle", "Hemmingway stranded with two rum bottles and jungle"]
  }],
  ["Neon Glow UV", {
    props: ["Body Paint", ""],
    costumes: [""]
  }],
  ["Antike Greek/Roman", {
    props: ["Grapes", "Wine"],
    costumes: ["Balearic Slinger", "Toga", "Philosoph in a Barrel"]
  }],
  ["Red Light", {
    props: ["", ""],
    costumes: ["Male Entertainer", "Stripper", "Pole Dancer", "Bondage Bitch with Cigarette", "Rollergirl"]
  }],
  ["Space Galaxy", {
    props: ["Glow in the Dark", "Stars", "Nebula", "Rick and Morty Portal"],
    costumes: ["Treasure Planet Character", "Silver"]
  }],
  ["Full Moon Party (the beach)", {
    props: ["", ""],
    costumes: ["barefoot-hippy", "fire-juggler"]
  }],
  ["Burning Man", {
    props: ["LED", "Firewörks", "Art Sculpture"],
    costumes: ["Steampunk-Carddealer", "Pink Art Cowboy", "Naked with butterly Wings"]
  }],
  ["Kit Kat Club Berlin", {
    props: ["", ""],
    costumes: ["", ""]
  }],
  ["Fred Again Clara (the night is dark) [london rideout 27 October 2022]", {
    props: ["Boxes", "rental cycles", "everything bycicle-like with wheels"],
    costumes: ["", ""]
  }]
]);
// Access console.log(partyThemes.get("pirates").props);

// plan scale supplies per recipe per person

// as style
export const channelStyle = [
  "Hunter S. Thompson and Fear and Loathing Las Vegas Humor",
  "Klaus Hargreeves from Umbrella Academy",
  "Instagrams Dirty Olaf",
  "Raymong Chandler",
  "Pirates of the Carribean Barbossa",
  "Chuck Palahniuk",
  "Hemmingway",
  "patois Borat",
  "WOWs Bwonsamdi",
  "Peaky Blinders Alfie",
  "Amazon Series Fallout- The Ghoul",
  "Brooklyn 99 -Pimento"
  ];

// Bosun Bills Zandalarian Tikki Mask 
export const encounters = {
  sing: {
    scenario: ["cursed parrot demands a sea shanty"],
    solution: ["Crew must sing together to appease it"]
  },
  tag: {
    scenario: ["black spot appears"],
    solution: ["pass it around unto someone or invent a joke to break the curse"]
  },
  findGear: {
    scenario: ["Rum was stolen"],
    solution: ["search for hidden stache lifevest, fire extinguisher, epirb, halyard,.."]
  },
  MOB: {
    scenario: ["Sharks in Water"],
    solution: ["Rescue Guillermo"]
  },
  murderMystery: {
    scenario: ["Spy on Board"],
    solution: ["find the person"]
  },
  HeadToWind: {
    scenario: ["Mermaid on the Rocks"],
    solution: ["Come to irons"]
  },
  SilentSail: {
    scenario: ["Ghost Ship Sighting"],
    solution: ["Maneuver without speaking", "sail blindfolded"]
  },
  funnyDares: {
    scenario: ["Cursed Dice"],
    solution: [""]
  },
  DeadReckoning: {
    scenario: [""],
    solution: ["Navigate without GPS"]
  },
  RiggingClimb: {
    scenario: [""],
    solution: [""]
  },
  Untangle: {
    scenario: ["TheRopeSnake"],
    solution: [""]
  },
  RopeRelay: {
    scenario: [""],
    solution: ["tie knots"]
  },
  EmercencyTack: {
    scenario: [""],
    solution: ["30 seconds to swith"]
  },
  ManThePumps: {
    scenario: [""],
    solution: ["teamwork Buckets", "find holes below waterline"]
  },
  AnchorDrill: {
    scenario: [""],
    solution: ["drop/rise fast with clutch"]
  },
  SailsTorn: {
    scenario: [""],
    solution: ["reef"]
  },
  FireOnDeck: {
    scenario: [""],
    solution: ["extinguish"]
  },
};
// console.log(partyThemes.pirates.props); 
// → ["Treasure chest", "Rum bottles", "Skull flag", "Parrot plush"]

// party themes, fictional places the ship will visit and stops
export const Prompts = new Map([
  ["Food", {
    P1: [`
      You are \${narrator} from \${location}.
      Suggest a \${mealType} recipe typical of \${location}.
      If there is no real one, invent it but hint that it might be fictional.
      Make the narration playful, short, and culturally flavored.
      Return JSON with { "title": "...", "character": "...", "story": "...", "recipe": "..." }
    `]
  }],

  ["CultureMinister", {
    P1: [`
      You are acting as the "\${synonym}" — a flamboyant cultural minister of \${location}.
      Channel the style of \${style}.
      Tell a gonzo-story, beginning with "Arrr, ..." that is framed as a \${topic} of \${location}.
      Mix humor, exaggeration, and local color. 
      The narration should feel immersive and slightly unreliable, like tavern gossip told after too much rum. 
      It must be short, punchy, and dripping with atmosphere. 
      
      Return JSON in this format:
      {
        "title": "short catchy title of the story",
        "character": "\${synonym}",
        "location": "\${location}",
        "topic": "\${topic}",
        "style": "\${style}",
        "story": "the gonzo-style narration"
      }
    `]
  }]
]);


// 
export const partyHype = [
  "Arrr, noch 3x Schlafen",
  ];


// Export everything from one file cleanly so you don’t lose track:
// export {
//   cultureMinisterSynonyms,
//   cultureMinisterTopic,
//   feelGoodMinisterSynonyms,
//   feelGoodMinisterThemes,
//   channelStyle,
//   encounters,
//   Prompts,
//   partyHype
// };