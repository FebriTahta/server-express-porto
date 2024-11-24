// menghandle logika bisnis / business logic berupa if else dll
const {createTechSkill, getTechSkill} = require('./tech.repository')

const serviceCreateTechSkill = async (requestBody) => {
    const newTechSkill = await createTechSkill(requestBody);

    return {
        status: 'success',
        message: 'Create tech skill success',
        data: newTechSkill,
        res: true
    };
}

const serviceGetTechSkill = async () => {

    const showData = await getTechSkill();
    return {
        status: 'success',
        message: 'showing tech & skill',
        data: showData,
        res: true
    };
}

module.exports = {
    serviceCreateTechSkill, serviceGetTechSkill
}