/**
 * You give it the name of the group -> it returns you
 * Groups: CAT_ADJECTIVE, CAT_NATIONALITY, CAT_TEMPERAMENT
 * word sets are defined below
 */

export default (group: string) => random(src[group]);

interface Map {
    [key: string]: string[];
}

const src = `CAT_ADJECTIVES:Adorable|Homely|Quaint|Adventurous|Depressed|Horrible|Aggressive|Determined|Hungry|Real|Agreeable|Different|Relieved|Alert|Difficult|Alive|Rich|Amused|Distinct|Important|Angry|Impossible|Scary|Annoyed|Dizzy|Selfish|Annoying|Doubtful|Innocent|Shiny|Anxious|Drab|Inquisitive|Shy|Itchy|Silly|Ashamed|Sleepy|Attractive|Jealous|Smiling|Easy|Jittery|Smoggy|Elegant|Joyous|Sparkling|Bad|Embarrassed|Beautiful|Enchanting|Kind|Spotless|Encouraging|Stormy|Bewildered|Energetic|Lazy|Strange|Black|Enthusiastic|Light|Envious|Lively|Successful|Blue|Evil|Lonely|Super|Blue-eyed|Excited|Long|Blushing|Expensive|Lovely|Talented|Bored|Exuberant|Lucky|Tame|Brainy|Tender|Brave|Fair|Magnificent|Tense|Breakable|Faithful|Misty|Terrible|Bright|Famous|Modern|Tasty|Busy|Fancy|Motionless|Thankful|Fantastic|Muddy|Thoughtful|Calm|Fierce|Mushy|Thoughtless|Careful|Filthy|Mysterious|Tired|Cautious|Fine|Tough|Charming|Foolish|Nasty|Troubled|Cheerful|Fragile|Naughty|Clean|Frail|Nervous|Clear|Frantic|Nice|Clever|Friendly|Nutty|Uninterested|Cloudy|Frightened|Unsightly|Clumsy|Funny|Obedient|Unusual|Colorful|Obnoxious|Upset|Combative|Gentle|Odd|Uptight|Comfortable|Gifted|Old-fashioned|Concerned|Glamorous|Condemned|Gleaming|Outrageous|Victorious|Confused|Glorious|Outstanding|Vivacious|Cooperative|Courageous|Gorgeous|Panicky|Wandering|Crazy|Graceful|Perfect|Weary|Creepy|Grieving|Plain|Wicked|Crowded|Grotesque|Pleasant|Wide-eyed|Cruel|Grumpy|Poised|Wild|Curious|Poor|Witty|Cute|Handsome|Powerful|Worrisome|Happy|Precious|Worried|Dangerous|Dark|Helpful|Proud|Defeated|Hilarious|Puzzled|Zealous
CAT_NATIONALITY:Afghani|Algerian|Angolan|Argentine|Austrian|Australian|Bangladeshi|Belarusian|Belgian|Bolivian|Brazilian|British|Bulgarian|Cambodian|Cameroonian|Canadian|African|Chadian|Chinese|Colombian|Rican|Croatian|Czech|Republic|Danish|Ecuadorian|Egyptian|Salvadorian|English|Estonian|Ethiopian|Finnish|French|German|Ghanaian|Greek|Guatemalan|Dutch|Honduran|Hungarian|Icelandic|Indian|Indonesian|Iranian|Iraqi|Irish|Israeli|Italian|Coast|Jamaican|Japanese|Jordanian|Kazakh|Kenyan|Lao|Latvian|Libyan|Lithuanian|Malagasy|Malaysian|Mauritanian|Mexican|Moroccan|Namibian|Zealand|Nicaraguan|Nigerien|Nigerian|Norwegian|Omani|Pakistani|Panamanian|Paraguayan|Peruvian|Philippino|Polish|Portuguese|Republic|Romanian|Russian|Arabic|Scottish|Senegalese|Serbian|Singaporean|Slovak|Somalian|Spanish|Sudanese|Swedish|Swiss|Syrian|Thai|Tunisian|Turkish|Turkmenian|Ukranian|Uruguayan|Vietnamese|Welsh|Zambian|Zimbabwean|The
CAT_NICKNAME:Yellow|Blue|Red|Black|Brown
CAT_TEMPERAMENT:lazy|active|cuddly|playful`
    .split('\n')
    .reduce((accumulator: Map, current: string) => {
        const values = current.split(':');
        accumulator[values[0]] = values[1].split('|');
        return accumulator;
    }, {}) as Map;

function random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
