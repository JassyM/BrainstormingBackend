class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    return await this.model.findById(id);
  }

  /* async getAll() {
    return await this.model.find();
  } */

  /**
   * Obtiene un listado de datos del modelo, de acuerdo a la página y cantidad solicitadas.
   * @param {number} pageSize indica el tamaño de la página
   * @param {number} pageNum indica el número de la página a solicitar
   * @returns 
   */
  async getAll(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await this.model.find().skip(skips).limit(pageSize);
  }

  async create(entity) {
    return await this.model.create(entity);
  }

  async update(id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id) {
    await this.model.findByIdAndDelete(id);
    return true;
  }
}

module.exports = BaseRepository;