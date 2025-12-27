export const usernameController = (req, res) => {
    const username = req.params.username;
    res.send(`Welcome, ${username}!`);
}
export const searchController = (req, res) => {
    const keyword = req.query.keyword;
    res.send(`You Searched for: ${keyword}!`);
}