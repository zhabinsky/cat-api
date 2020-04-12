import populateCountries from './populateCountries';
import populateCats from './populateCats';

export default async () => {
    await populateCountries();
    await populateCats();
};
