import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

const mockTodosRepository = () => ({
  getTodos: jest.fn(),
  findOne: jest.fn(),
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

  describe('getTodosById', () => {
    it('TodosRepository.findOne를 호출하고 결과를 반환합니다.', async () => {
      const mockTodo = {
        id: 1,
        content: 'test content',
        created: '2021-09-01',
        order: 1,
        isChecked: false,
      };

      todosRepository.findOne.mockResolvedValue(mockTodo);
      const result = await todosService.getTodoById(1, mockUser);
      expect(result).toEqual(mockTodo);
    });

    it('TodosRepository.findOne을 호출하고 에러를 처리합니다.', async () => {
      todosRepository.findOne.mockResolvedValue(null);
      expect(todosService.getTodoById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
