const { IdeaRepository } = require('../../../src/repositories');
const mockingoose = require('mockingoose');
const { Idea } = require('../../../src/models');
let { IdeaModelMock: { idea, ideas } } = require('../../mocks');

describe('Idea Repository Tests', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('Should return an idea by idea', async () => {
    mockingoose(Idea).toReturn(idea, 'findOne');
    const _ideaRepository = new IdeaRepository({ Idea });
    Idea.schema.path('author', Object); // Esto hace la opción de autopopulate de manera que se indica al modelo Idea que
    Idea.schema.path('comments', Object); // contiene estos objetos, lo cual no permite borrar author y comments en la salida.
    const expected = await _ideaRepository.get(idea._id);
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(idea);
  });

  it('Should return the ideas by author', async () => {
    mockingoose(Idea).toReturn(ideas, 'find');
    const _ideaRepository = new IdeaRepository({ Idea });
    const expected = await _ideaRepository.getUserIdeas(idea.author._id);
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(ideas);
  });

  it('Should return an ideas collection', async () => {
    mockingoose(Idea).toReturn(ideas, 'find');
    const _ideaRepository = new IdeaRepository({ Idea });
    const expected = await _ideaRepository.getAll();
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(ideas);
  });
  
  it('Should update an idea by id', async () => {
    mockingoose(Idea).toReturn(idea, 'findOneAndUpdate');
    const _ideaRepository = new IdeaRepository({ Idea });
    const expected = await _ideaRepository.update(idea._id, {
      description: "Write a Software development book"
    });
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(idea);
  });

  it('Should delete an idea by id', async () => {
    mockingoose(Idea).toReturn(idea, 'findOneAndDelete');
    const _ideaRepository = new IdeaRepository({ Idea });
    const expected = await _ideaRepository.delete(idea._id);
    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
});