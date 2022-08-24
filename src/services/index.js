
export const getLabs = async () => {
    return [
        {
            id: 1,
            name: 'Agro Skynet',
        }, {
            id: 2,
            name: 'Umbrella Agro',
        }, {
            id: 3,
            name: 'Osborn Agro',
        }, {
            id: 4,
            name: 'Skyrim Agro',
        }, {
            id: 5,
            name: 'Agro Brasil',
        }, {
            id: 6,
            name: 'AgroJS',
        },
    ];
}

export const getProperties = async () => {
    return [
        {
            id: 1,
            name: 'Agrotis 1',
            cnpj: '04.909.987/0001-89',
        }, {
            id: 2,
            name: 'Agrotis 2',
            cnpj: '04.909.987/0001-88',
        },
        {
            id: 3,
            name: 'Agrotis 3',
            cnpj: '04.909.987/0001-87',
        },
        {
            id: 4,
            name: 'Agrotis 4',
            cnpj: '04.909.987/0001-86',
        },
        {
            id: 5,
            name: 'Agrotis 5',
            cnpj: '04.909.987/0001-85',
        },
        {
            id: 6,
            name: 'Agrotis 6',
            cnpj: '04.909.987/0001-84',
        },
    ]

}

export const postData = async (data) => {
    // console.table(data);
    console.log(data);
}