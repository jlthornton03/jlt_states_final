const statesJSONData = require('../model/states.json');

const verifyStates = () => {
    return (req, res, next) => {
        const stateNames = statesJSONData.map(st=> st.code);
        const stateAbbr = req.params.state.toUpperCase();
        const isState = stateNames.find(code => code === stateAbbr);
        if (!isState) return res.status(400).json({ "message":"Invalid state abbreviation parameter" });
        next();
    }
}

module.exports = verifyStates;
