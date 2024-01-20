import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/module/user/controller/user.controller';
import { UserService } from '../../../src/module/user/service/user.service';
import { DbUserDto } from 'src/module/user/dto/db.user.dto';
import { NewUserDto } from 'src/module/user/dto/new.user.dto';
import { UpdateUserDto } from 'src/module/user/dto/update.user.dto';
import { DeleteResult } from 'typeorm';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUsersDto: DbUserDto[] = [];
  const mockUserDto: DbUserDto = {
    id: 10,
    firstName: 'Nombre',
    lastName: 'Apellido',
    nationality: 'Argentina',
    address: 'Calle 123',
    phoneNumber: '245 4547 32',
    email: 'email@gmail.com',
    birthdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockNewUserDto: NewUserDto = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    nationality: 'Argentina',
    address: 'Calle 123',
    phoneNumber: '245 4547 32',
    email: 'email@gmail.com',
    birthdate: new Date(),
  };
  const mockUpdateUserDto: UpdateUserDto = {
    id: 10,
    ...mockNewUserDto,
  };
  const mockDeleteResult: DeleteResult = {
    raw: undefined,
    affected: 1,
  };

  const mockUserService = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUsers', () => {
    it('Call the getUsers method of the UserService layer and return an array of DbUserDto entities', async () => {
      jest.spyOn(userService, 'getUsers').mockResolvedValue(mockUsersDto);
      const result = await userController.getUsers();

      expect(userService.getUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsersDto);
    });
  });

  describe('getUser', () => {
    it('Call the getUser method of the userService layer and return a DbUserDto entity', async () => {
      const id = 10;
      jest.spyOn(userService, 'getUser').mockResolvedValue(mockUserDto);
      const result = await userController.getUser(id);

      expect(userService.getUser).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('createUser', () => {
    it('Call the createUser method of the userService layer and return a new DbUserDto entity', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUserDto);
      const result = await userController.createUser(mockNewUserDto);

      expect(userService.createUser).toHaveBeenCalledWith(mockNewUserDto);
      expect(result).toEqual(mockUserDto);
    });
  });

  describe('updateUser', () => {
    it('Call the updateUser method of the userService layer and it should return an updated DbUserDto entity', async () => {
      const id = 10;
      jest.spyOn(userService, 'updateUser').mockResolvedValue(mockUserDto);
      const result = await userController.updateUser(id, mockNewUserDto);

      expect(userService.updateUser).toHaveBeenCalledWith(mockUpdateUserDto);
      expect(result).toEqual(mockUserDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('deleteUser', () => {
    it('Call the deleteUser method of the userService layer and return the deleted Dto entity', async () => {
      const id = 10;
      jest.spyOn(userService, 'getUser').mockResolvedValue(mockUserDto);
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(mockDeleteResult);
      const result = await userController.deleteUser(id);

      expect(userService.getUser).toHaveBeenCalledWith(id);
      expect(userService.deleteUser).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserDto);
      expect(result.id).toEqual(id);
    });
  });
});
