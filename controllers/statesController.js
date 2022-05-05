const statesJSONData = require('../model/states.json');
const mongoStates = require('../model/State');

const getAllStates = async (req, res) => {
    const {contig} = req.query;
    if (contig === 'true') {
        statesList = statesJSONData.filter(st => st.code != 'AK' && st.code != 'HI');
    }else if(contig === 'false') {
        statesList = statesJSONData.filter(st => st.code === 'AK' || st.code === 'HI');
    }else {
        statesList = statesJSONData;
    }

    const mongoArr = await mongoStates.find();
    let mergedData =[];
    statesList.forEach ( state => {
        const stateExists = mongoArr.find(st => st.stateCode === state.code)
        if (stateExists){
            newArr = {
                ...state,
                "funfacts": stateExists.funfact 
            }
        }else{
            newArr = {
                ...state
            };
        }
        mergedData.push(newArr);
    })
    res.json(mergedData);
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

     stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
     const mongoArr = await mongoStates.find();
     let mergedData =[];
     stateList.forEach ( state => {
         const stateExists = mongoArr.find(st => st.stateCode === state.code)
         if (stateExists){
             newArr = {
                 ...state,
                 "funfacts": stateExists.funfact 
             }
         }else{
             newArr = {
                 ...state
             };
         }
         mergedData.push(newArr);
     })
     res.json(mergedData);
}




module.exports = {
    getAllStates,
    getState,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission
}
