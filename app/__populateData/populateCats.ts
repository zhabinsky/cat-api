import download from '../server/utils/download'
import * as Models from '../server/models';
import { LoremIpsum } from "lorem-ipsum";
import chalk from 'chalk';

export default async () => {
	const count = await Models.Breed.Model.countDocuments();

	if(count > 20) {
		return console.notify(`Found ${count} breeds of cats in the DB`);
	}

	// continue populating the database with random breeds

	for(let i = 0; i < 20; i++) {
		await generateRandomBreed()
	}

}

const getRandomCountry = async () => {
	const countCountries = await Models.Country.Model.countDocuments();
	const random = Math.floor(Math.random() * countCountries)

	return new Promise((resolve,reject) => {
		return Models.Country.Model.findOne().skip(random).exec(
			function(err,result) {
				if(err) return reject();
				resolve(result)
			})
	})
}


const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4
	},
	wordsPerSentence: {
		max: 16,
		min: 4
	}
});

const generateRandomBreed = async () => {
	try {
		const picture = await download('https://cataas.com/cat',randomFilename())
		const description = lorem.generateSentences(5);
		const temperament = random(temperaments);
		const country = await getRandomCountry();

		const name = [
			random(nationalities),
			random(adjectives),
			random(colors),
		].join(' ');

		const breed = {
			name,
			picture,
			description,
			temperament,
			origin: country._id
		}

		await new Models.Breed.Model(breed).save();
		console.count(chalk.yellow('Added random breed'))
	} catch(e) {
		console.error(e)
	}
}


// TODO: standardize this
const adjectives = 'Adorable|Homely|Quaint|Adventurous|Depressed|Horrible|Aggressive|Determined|Hungry|Real|Agreeable|Different|Hurt|Relieved|Alert|Difficult|Repulsive|Alive|Disgusted|Rich|Amused|Distinct|Important|Angry|Disturbed|Impossible|Scary|Annoyed|Dizzy|Inexpensive|Selfish|Annoying|Doubtful|Innocent|Shiny|Anxious|Drab|Inquisitive|Shy|Dull|Itchy|Silly|Ashamed|Sleepy|Attractive|Eager|Jealous|Smiling|Average|Easy|Jittery|Smoggy|Awful|Elated|Jolly|Elegant|Joyous|Sparkling|Bad|Embarrassed|Beautiful|Enchanting|Kind|Spotless|Encouraging|Stormy|Bewildered|Energetic|Lazy|Strange|Black|Enthusiastic|Light|Envious|Lively|Successful|Blue|Evil|Lonely|Super|Blue-eyed|Excited|Long|Blushing|Expensive|Lovely|Talented|Bored|Exuberant|Lucky|Tame|Brainy|Tender|Brave|Fair|Magnificent|Tense|Breakable|Faithful|Misty|Terrible|Bright|Famous|Modern|Tasty|Busy|Fancy|Motionless|Thankful|Fantastic|Muddy|Thoughtful|Calm|Fierce|Mushy|Thoughtless|Careful|Filthy|Mysterious|Tired|Cautious|Fine|Tough|Charming|Foolish|Nasty|Troubled|Cheerful|Fragile|Naughty|Clean|Frail|Nervous|Clear|Frantic|Nice|Ugly|Clever|Friendly|Nutty|Uninterested|Cloudy|Frightened|Unsightly|Clumsy|Funny|Obedient|Unusual|Colorful|Obnoxious|Upset|Combative|Gentle|Odd|Uptight|Comfortable|Gifted|Old-fashioned|Concerned|Glamorous|Open|Vast|Condemned|Gleaming|Outrageous|Victorious|Confused|Glorious|Outstanding|Vivacious|Cooperative|Courageous|Gorgeous|Panicky|Wandering|Crazy|Graceful|Perfect|Weary|Creepy|Grieving|Plain|Wicked|Crowded|Grotesque|Pleasant|Wide-eyed|Cruel|Grumpy|Poised|Wild|Curious|Poor|Witty|Cute|Handsome|Powerful|Worrisome|Happy|Precious|Worried|Dangerous|Dark|Helpful|Proud|Defeated|Hilarious|Puzzled|Zealous'.split('|');
const nationalities = 'Afghan|Algerian|Angolan|Argentine|Austrian|Australian|Bangladeshi|Belarusian|Belgian|Bolivian|Brazilian|British|Bulgarian|Cambodian|Cameroonian|Canadian|African|Chadian|Chinese|Colombian|Rica|Croatian|Czech|Republic|Danish|Ecuadorian|Egyptian|Salvador|English|Estonian|Ethiopian|Finnish|French|German|Ghanaian|Greek|Guatemalan|Dutch|Honduran|Hungarian|Icelandic|Indian|Indonesian|Iranian|Iraqi|Irish|Israeli|Italian|Coast|Jamaican|Japanese|Jordanian|Kazakh|Kenyan|Lao|Latvian|Libyan|Lithuanian|Malagasy|Malaysian|Malian|Mauritanian|Mexican|Moroccan|Namibian|Zealand|Nicaraguan|Nigerien|Nigerian|Norwegian|Omani|Pakistani|Panamanian|Paraguayan|Peruvian|Philippino|Polish|Portuguese|Republic|Romanian|Russian|Arabia|Scottish|Senegalese|Serbian|Singaporean|Slovak|Somalian|Spanish|Sudanese|Swedish|Swiss|Syrian|Thai|Tunisian|Turkish|Turkmen|Ukranian|United|United|Uruguayan|Vietnamese|Welsh|Zambian|Zimbabwean|The'.split('|')
const colors = 'White|Yellow|Blue|Red|Green|Black|Brown|Azure'.split('|')
const temperaments = 'lazy|active|cuddly|playful'.split('|')

function random(arr: Array<String>) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function randomFilename() {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

	let result = '';

	for(let i = 0; i < 15; i++)
		result += characters.charAt(Math.floor(Math.random() * characters.length));

	// TODO: check if this name has not been occupied yet
	return result;
}

