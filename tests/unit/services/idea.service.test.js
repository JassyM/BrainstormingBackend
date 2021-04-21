const { IdeaService } = require('../../../src/services');
const { IdeaModelMock: { idea, ideas } } = require('../../mocks');
const { IdeaRepositoryMock } = require('../../mocks');

describe('Idea Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should find an idea by id', async () => {
    const IdeaRepository = IdeaRepositoryMock;
    IdeaRepository.get.mockReturnValue(idea);
    const _ideaService = new IdeaService({ IdeaRepository });
    const expected = await _ideaService.get(idea._id);
    expect(expected).toMatchObject(idea);
  });

  it('Should find an ideas by author', async () => {
    const IdeaRepository = IdeaRepositoryMock;
    IdeaRepository.getUserIdeas.mockReturnValue(ideas);
    const _ideaService = new IdeaService({ IdeaRepository });
    const expected = await _ideaService.getUserIdeas(idea.author._id);
    expect(expected).toMatchObject(ideas);
  });

  it('Should return an ideas collection', async () => {
    const IdeaRepository = IdeaRepositoryMock;
    IdeaRepository.getAll.mockReturnValue(ideas);
    const _ideaService = new IdeaService({ IdeaRepository });
    const expected = await _ideaService.getAll();
    expect(expected).toMatchObject(ideas);
  });

  it('Should update an idea by id', async () => {
    const IdeaRepository = IdeaRepositoryMock;
    IdeaRepository.update.mockReturnValue(idea);
    const _ideaService = new IdeaService({ IdeaRepository });
    const expected = await _ideaService.update(idea._id, idea);
    expect(expected).toMatchObject(idea);
  });

  it('Should delete an idea by id', async () => {
    const IdeaRepository = IdeaRepositoryMock;
    IdeaRepository.delete.mockReturnValue(true);
    const _ideaService = new IdeaService({ IdeaRepository });
    const expected = await _ideaService.delete(idea._id);
    expect(expected).toEqual(true);
  });
});