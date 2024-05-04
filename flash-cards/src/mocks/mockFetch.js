export default async function mockFetch(url) {
    switch (url) {
        case "https://pogoapi.net/api/v1/pokemon_types.json": {
            return {
                ok: true,
                status: 200,
            };
        }
       
        case "https://pogoapi.net/api/v1/type_effectiveness.json": {
            return {
                ok: true,
                status: 200,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}