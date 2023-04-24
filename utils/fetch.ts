async function fetchData(url: string): Promise<JSON> {
    return await window.fetch(url)
        .then((response) => { 
            if (!response.ok) {
                throw new Error("request failed");
            }

            return response.json();
        }).catch(() => ({} as JSON));
}

export default fetchData;
