const axios = require('axios');

const blah = async () => {
    const repos = await axios(
        'https://api.github.com/user/repos?per_page=100',
        {
            auth: {
                username: 'john-crisostomo',
                password: ''
            }
        }
    );

    const filtered = repos.data.filter(
        repo => repo.owner.login === 'john-crisostomo'
    );
    console.log(`Fetched a total of ${filtered.length} repos`);

    for (let i = 0; i < filtered.length; i += 1) {
        const repo = filtered[i];

        await axios
            .post(
                `https://api.github.com/repos/john-crisostomo/${
                    repo.name
                }/transfer`,
                {
                    new_owner: 'johncrisostomo'
                },
                {
                    auth: {
                        username: 'john-crisostomo',
                        password: ''
                    },
                    headers: {
                        Accept: 'application/vnd.github.nightshade-preview+json'
                    }
                }
            )
            .then()
            .catch(err => console.log(err));
    }
};

blah();
