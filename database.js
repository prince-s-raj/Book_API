const books = [
    {
        ISBN: "1234Book",
        title: "JS Basic",
        pubDate: "2021-10-10",
        language: "en",
        numPage: 300,
        authors: [1,2],
        publications: [1],
        category: ["Tech", "Programming", "Education"]
    }
];

const authors = [
    {
        id: 1,
        name: "Sanjeev",
        books: ["1234Book", "mine"]
    },
    {
        id: 2,
        name:"Steven",
        books: ["1234Book", "rogers"]
    }
];

const publications = [
    {
        id: 1,
        name: "SK Tech Solution",
        books: ["1234Book"]

    },
    {
        id: 2,
        name: "WSO2",
        books: []

    }
];

module.exports =  {books,authors,publications};

//Mongoose -> Validation