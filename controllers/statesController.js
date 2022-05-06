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
                "funfacts": stateExists.funfacts 
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
          capital: item.capital_city
      
        }
      });

    return res.json(newArr[0]);           
}
const getStateNickname =  async (req, res) => {
    
    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
    
    let newArr = stateList.map((item) => {
        return {
          state: item.state,
          nickname: item.nickname
        }
      });
    return res.json(newArr[0]);           
}

const getStatePopulation =  async (req, res) => {

    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
   // population = String(item.population).replace(/(.)(?=(\d{3})+$)/g,'$1,')
    let newArr = stateList.map((item) => {
        return {
          state: item.state,
          population: String(item.population).replace(/(.)(?=(\d{3})+$)/g,'$1,')
        }
      });
    return res.json(newArr[0]);           
}

const getStateAdmission =  async (req, res) => {

    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
    
    let newArr = stateList.map((item) => {
        return {
          state: item.state,
          admitted: item.admission_date
        }
      });
    return res.json(newArr[0]);           
}

const getStateFunfact =  async (req, res) => {
    stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
    const mongoArr = await mongoStates.find();
    stateList.forEach ( state => {
        const stateExists = mongoArr.find(st => st.stateCode === state.code);
        if (stateExists){
            newArr = stateList.map((item) => {
                return {
                  funfact: stateExists.funfacts
                }
              });
        }else{
            newArr = stateList.map((item) => {
                return {
                    message: "No Fun Facts found for " + item.state
                }
            });
        }
    });

    res.json(newArr[0]);
}


const getState =  async (req, res) => {
     stateList = statesJSONData.filter(st => st.code === req.params.state.toUpperCase());
     const mongoArr = await mongoStates.find();
     stateList.forEach ( state => {
         const stateExists = mongoArr.find(st => st.stateCode === state.code);
         if (stateExists){
             console.log("test")
              mergedData = 
                 {
                 ...state,
                 "funfacts": stateExists.funfacts
                 }
         }else{
             
             mergedData = {
                 ...state
             };
         }
     })
     res.json(mergedData);
}


const createNewFunFact = async (req, res) => {

    if (!req?.body?.funfacts){
        return res.status(400).json({ 'message': 'State fun facts value required' });
    }
    if ((Array.isArray(req.body.funfacts) === false)){
        return res.status(400).json({ 'message': 'State fun facts value must be an array' });
    }

    const stateAbbr = req.params.state.toUpperCase();
    const result = await mongoStates.findOneAndUpdate({ stateCode: stateAbbr}, { $push: {funfacts: { $each: req.body.funfacts } } });


    //stateList = statesJSONData.filter(st => st.code === stateAbbr);
    //const mongoArr = await mongoStates.find();
    //stateList.forEach ( state => {
    //    const stateExists = mongoArr.find(st => st.stateCode === state.code);
    //    if (stateExists){
    //        newArr = stateList.map((item) => {
    //            return {
    //              funfact: stateExists.funfact 
    //            }
    //          });
    //    }else{
    //        newArr = stateList.map((item) => {
    //            return {
    //                message: "No Fun Facts found for " + item.state
    //            }
    //        });
    //    }
    //});

    res.status(201).json(result);
}



module.exports = {
    getAllStates,
    getState,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission,
    getStateFunfact, 
    createNewFunFact
}
