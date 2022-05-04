const statesJSONData = require('../model/states.json');
const mongoStates = require('../model/States');
//const verifyStates = require('../middleware/verifyStates');


//const combStates =

const getAllStates = (req, res) => {
    const {contig} = req.query;
    if (contig === 'true') {
        statesList = statesJSONData.filter(st => st.code != 'AK' && st.code != 'HI');
    }else if(contig === 'false') {
        statesList = statesJSONData.filter(st => st.code === 'AK' || st.code === 'HI');
    }else {
        statesList = statesJSONData;
    }

  // statesJSONData.forEach(state => {
        //const stateExists = mongoStates.find(st => st.statecode === state.code);
  //      const stateExists = mongoStates.find(st => st.stateCode === state.code);
  //      console.log(stateExists);
  //      console.log(state.code);
  //      })

    //statesList.forEach(stateArr => {
     //   const stateExist =  mongoStates.find(st => st.stateCode === stateArr.code);
     //   console.log(stateExist);

    // });
    return res.json(statesList);
    //res.json.stringify(statesList);
}

const getStateCapital =  async (req, res) => {
    console.log(req.params.state);
    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
    
    let newArr = stateList.map((item) => {
        return {
          state: item.state,
          captial: item.capital_city
      
        }
      });

    return res.json(newArr);           
}
const getStateNickname =  async (req, res) => {
    
    const stateNames = statesJSONData.map(st=> st.code);
    const stateAbbr = req.params.state.toUpperCase()
    const isState = stateNames.find(code => code === stateAbbr);
    if (!isState) return res.status(400).json({ "message":"Invalid state abbreviation parameter" });
    
    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
    
    let newArr = stateList.map((item) => {
        return {
          state: item.state,
          nickname: item.nickname
        }
      });
    return res.json(newArr);           
}

const getStatePopulation =  async (req, res) => {

    const stateNames = statesJSONData.map(st=> st.code);
    const stateAbbr = req.params.state.toUpperCase()
    const isState = stateNames.find(code => code === stateAbbr);
    if (!isState) return res.status(400).json({ "message":"Invalid state abbreviation parameter" });


    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
    
    let newArr = stateList.map((item) => {
        return {
          state: item.state,
          population: item.population
        }
      });
    return res.json(newArr);           
}

const getStateAdmission =  async (req, res) => {

    const stateNames = statesJSONData.map(st=> st.code);
    const stateAbbr = req.params.state.toUpperCase()
    const isState = stateNames.find(code => code === stateAbbr);
    if (!isState) return res.status(400).json({ "message":"Invalid state abbreviation parameter" });

    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
    
    let newArr = stateList.map((item) => {
        return {
          state: item.state,
          admitted: item.admission_date
        }
      });
      ({ "message": `No employee matches ID ${req.body.id} ` });
    //res.json( { "state" : `${newArr[state]}`  } )
    return res.json(newArr);           
}

const getState =  async (req, res) => {

    const stateNames = statesJSONData.map(st=> st.code);
    const stateAbbr = req.params.state.toUpperCase()
    const isState = stateNames.find(code => code === stateAbbr);
    if (!isState) return res.status(400).json({ "message":"Invalid state abbreviation parameter" });

     stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());

  //  const allstate = await mongoStates.find();
  //  console.log(allstate.funfact);
  //  if (!allstate) return res.status(204).json({ 'message': 'no states found.' })
    //newArr
    return res.json(stateList);
}




module.exports = {
    getAllStates,
    getState,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission
}
