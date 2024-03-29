import download from '../server/utils/download';
import Models from '../server/models';
import { LoremIpsum } from 'lorem-ipsum';
import getRandomWord from './getRandomWord';
import chalk from 'chalk';
import { generateCatName } from './utils';

export default async () => {
    const count = await Models.Breed.Model.countDocuments();

    if (count > 10) {
        console.notify(`There are enough cats: ${count}`);
    } else {
        for (let i = 0; i < 5555; i++) {
            await generateRandomBreed(i);
        }
    }
};

const getRandomCountry = async () => {
    const countCountries = await Models.Country.Model.countDocuments();
    const random = Math.floor(Math.random() * countCountries);

    interface CountryObject {
        _id: string;
    }

    return new Promise((resolve, reject) => {
        return Models.Country.Model.findOne()
            .skip(random)
            .exec((err, country: CountryObject) => {
                if (err) return reject(err);
                resolve(country._id);
            });
    });
};

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

const generateRandomBreed = async (index: number) => {
    try {
        const picture = await download(
            'https://cataas.com/cat',
            randomFilename(),
        );
        const description = lorem.generateSentences(5);
        const temperament = getRandomWord('CAT_TEMPERAMENT');
        const countryId = await getRandomCountry();

        const name = generateCatName();

        const breed = {
            name,
            picture,
            description,
            temperament,
            origin: countryId,
        };

        await new Models.Breed.Model(breed).save();
        console.log(chalk.yellow('Added random breed'), name, index);
    } catch (e) {
        console.error(e);
    }
};

function randomFilename() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for (let i = 0; i < 15; i++)
        result += characters.charAt(
            Math.floor(Math.random() * characters.length),
        );

    // TODO: check if this name has not been occupied yet
    return result;
}
