import { createProject, createTodo } from '../create';

describe('Create the project', () => {
  const project = createProject('sleep');

  test('return project name', () => {
    expect(project.name).toEqual('sleep');
  });

  test('it will return project task type ', () => {
    const project = createProject('sleep');
    expect(typeof project.todos).toEqual('object');
  });
});

describe('Create a todo', () => {
  const todo = createTodo('sleeping', 'night sleep', 'low', '11-11-1111', '11:11', '11111');

  test('return todo name', () => {
    expect(todo.name).toEqual('sleeping');
  });

  test('return todo description', () => {
    expect(todo.desc).toEqual('night sleep');
  });

  test('return todo priority', () => {
    expect(todo.prior).toEqual('low');
  });

  test('return todo date', () => {
    expect(todo.date).toEqual('11-11-1111');
  });

  test('return todo time', () => {
    expect(todo.time).toEqual('11:11');
  });

  test('return todo notes', () => {
    expect(todo.note).toEqual('11111');
  });
});
