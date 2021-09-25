import { Test } from '@nestjs/testing';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

const mockTodosRepository = () => ({
  getTodos: jest.fn(),
});

const mockUser = {
  email: 'testemail',
  id: 1,
  username: 'testusername',
  password: 'testpassword',
  todos: [],
};

describe('TodosService', () => {
  let todosService: TodosService;
  let todosRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: TodosRepository, useFactory: mockTodosRepository },
      ],
    }).compile();

    todosService = module.get(TodosService);
    todosRepository = module.get(TodosRepository);
  });

  describe('getTodos', () => {
    it('TodosRepository.getTodos를 호출하고 결과를 반환합니다.', () => {
      expect(todosRepository.getTodos).not.toHaveBeenCalled();

      todosRepository.getTodos.mockResolvedValue('some value');
      const result = todosService.getTodos(mockUser);
      expect(result).toEqual('some value');
    });
  });
});
