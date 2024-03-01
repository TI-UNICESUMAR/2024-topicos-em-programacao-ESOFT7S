import { Router, Response, Request } from 'express'
import axios from 'axios'
import { writeFile } from 'fs/promises'

const API_SCRYFALL = 'https://api.scryfall.com';

const routes = Router()

const getCommander = async (commanderName) => {
    const response = await axios.get(`${API_SCRYFALL}/cards/named?exact=${commanderName}`);

    return response.data;
}

const getCardsByColorAndSet = async (colors: string[], set: string) => {
    const response = await axios.get(`${API_SCRYFALL}/cards/search?q=colors:${colors.join(' ')}&unique=cards&order=random&lang=en&page=1&set=${set}`)
    return response.data;
}

const saveDeckToFile = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    writeFile('deck.json', jsonData);
}

routes.get('/', async (req: Request, res: Response) => {
    const commander = await getCommander("Atraxa, Praetors' Voice")
    const colors = commander.colors;
    const setName = commander.set_name;

    const cards = await getCardsByColorAndSet(colors, setName);

    const deck = cards.data.slice(0, 99);

    const commanderObject = {
        name: commander.name,
        colors: commander.colors
    };
    const cardsList = deck.map(card => {
        return {
            name: card.name,
            cardColors: card.colors ?? []
        }
    })
    const beautifulObject = {
        commanderObject,
        cardsList
    }

    saveDeckToFile(beautifulObject);

    res.send(beautifulObject);
});


export default routes