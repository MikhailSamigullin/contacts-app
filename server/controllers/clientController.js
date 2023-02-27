const {Client} = require('../models/models');
const ApiError = require('../error/apiError');

class ClientController {
  async create(req, res, next) {
    try {
      let {name, email, phone, description, discount} = req.body;
      const client = await Client.create({name, email, phone, description, discount});


      return res.json(client);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
    
  }

  async getAll(req, res) {
    try {
  //Pagination
      let {limit, page} = req.query;
      page = page || 1;
      limit = limit || 1000;
      let offset = page * limit - limit;
  //
      const clients = await Client.findAndCountAll({limit, offset});
      return res.json(clients);
  } catch(e) {
      console.log(e);
  }
  }
  
  async getOne(req, res) {
    const {id} = req.params;
    const client = await Client.findOne(
      {
        where: {id}
        // include: [{model: Client, as: 'info'}]
      }
    )
    return res.json(client);
  }

  async deleteOne(req, res) {
    const {id} = req.params;
    await Client.destroy(
      {
        where: {id}
      }
    )
  }

  async updateOne(req, res, next) {
    let {id, name, email, phone, description, discount} = req.body;
    // const {id} = req.params;
    try {
      const client = await Client.update({name, email, phone, description, discount
      }, {
        where: {id}
      });
      return res.json(client);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
    
  }

};

module.exports = new ClientController();
