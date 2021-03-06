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
    const mongoArr = await mongoStates.find();
    const stateExists = mongoArr.find(st => st.stateCode === stateAbbr);

    if (!stateExists){
        try {
            await mongoStates.create({
                stateCode: stateAbbr
            });
        } catch (err) {
            console.error(err);
        }
    }
    const result = await mongoStates.findOneAndUpdate({ stateCode: stateAbbr}, { $push: {funfacts: { $each: req.body.funfacts } } }, {new: true});
    res.status(201).json(result);
}

const updateFunFact = async (req, res) => {

    if (!req?.body?.index){
        return res.status(400).json({ 'message': 'State fun fact index value required' });
    }
    if (!req?.body?.funfact){
        return res.status(400).json({ 'message': 'State fun fact value required' });
    }

    const stateAbbr = req.params.state.toUpperCase();
    const stateArr = statesJSONData.filter(st => st.code === stateAbbr);
    const mongoArr = await mongoStates.find();
    const stateExists = await mongoArr.find(st => st.stateCode === stateAbbr);
    const stateName =stateArr[0].state

    if (!stateExists){
        return res.status(400).json({ 'message': `No Fun Facts found for ${stateName}` });
        }
    
    arrIndex=req.body.index -1;
    const indexExists = await mongoStates.find({ stateCode: stateAbbr }).select('funfacts');
    if (!(indexExists[0].funfacts[arrIndex]) ){
        return res.status(400).json({ 'message': `No Fun Fact found at that index for ${stateName}` });
    }

    var funfactIn = "funfacts." + arrIndex;

    var query= { stateCode: stateAbbr};
    var update = {  [funfactIn] : req.body.funfact };
    
    const result = await mongoStates.findOneAndUpdate(query, update, {new: true});

    res.status(201).json(result);
}


const deleteFunFact = async (req, res) => {

    if (!req?.body?.index){
        return res.status(400).json({ 'message': 'State fun fact index value required' });
    }

    const stateAbbr = req.params.state.toUpperCase();
    const stateArr = statesJSONData.filter(st => st.code === stateAbbr);
    const mongoArr = await mongoStates.find();
    const stateExists = mongoArr.find(st => st.stateCode === stateAbbr);
    const stateName =stateArr[0].state;

    if (!stateExists){
        return res.status(400).json({ 'message': `No Fun Facts found for ${stateName}` });
        }


    arrIndex=req.body.index -1;
    const indexExists = await mongoStates.find({ stateCode: stateAbbr }).select('funfacts');
    if (!(indexExists[0].funfacts[arrIndex])){
        return res.status(400).json({ 'message': `No Fun Fact found at that index for ${stateName}` });
    }

    var funfactIn = "funfacts." + arrIndex;

    var query= { stateCode: stateAbbr};
    var update = {  [funfactIn] : req.body.funfact };

    //await mongoStates.find({ stateCode: stateAbbr }).select('funfacts');
    var query= { stateCode: stateAbbr};
    var update = {  [funfactIn] : '**DELETE**' };
    
    await mongoStates.findOneAndUpdate(query, update, {new: true});

    const result = await mongoStates.findOneAndUpdate(query, 
        { $pull : { funfacts: '**DELETE**' } }  
        , {new: true});

    
    console.log(result);


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
    createNewFunFact,
    updateFunFact,
    deleteFunFact
}
