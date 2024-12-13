// menghandle logika bisnis / business logic berupa if else dll
const techRepositories = require('./tech.repository')

class TechServices {
    async createTech(requestBody) {
        
        const find = await this.findTechs(requestBody.techName);

        if (find.res == true) {
            return {
                status: 'error',
                message: 'Tech name already exist',
                data: find,
                res: false,
                code: 500
            };    
        }

        const newTech = await techRepositories.createTech(requestBody);
        return {
            status: 'success',
            message: 'Create tech skill success',
            data: newTech,
            res: true,
            code: 201
        };
    }

    async findTechs(techName) {
        
        const find = await techRepositories.findTech(techName);
      
        if (!find) {
            return {
                status: 'success',
                message: 'data not found',
                data: null,
                res: false
            } 
        }
        return {
            status: 'success',
            message: 'data found',
            data: find,
            res: true
        } 
    }

    async techList() {
        const showData = await techRepositories.techList();
        return {
            status: 'success',
            message: 'showing tech & skill',
            data: showData,
            res: true
        };
    }

}
module.exports = new TechServices();