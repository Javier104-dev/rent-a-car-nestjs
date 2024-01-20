import { Test, TestingModule } from '@nestjs/testing';
import { DbUserDto } from 'src/module/user/dto/db.user.dto';
import { UserRepository } from '../../../src/module/user/repository/user.repository';
import { UserService } from '../../../src/module/user/service/user.service';
import { NewUserDto } from 'src/module/user/dto/new.user.dto';
import { UpdateUserDto } from 'src/module/user/dto/update.user.dto';
import { DeleteResult } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const mockDbUsersDto: DbUserDto[] = [];
  const mockDbUserDto: DbUserDto = {
    id: 35,
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
    id: 35,
    ...mockNewUserDto,
  };
  const mockDeleteResult: DeleteResult = {
    raw: undefined,
    affected: 1,
  };

  const mockUserRepository = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers', () => {
    it('Call the getUsers method of the userRepository layer and return an array of DbUserDto entities', async () => {
      jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockDbUsersDto);
      const result = await userService.getUsers();

      expect(userRepository.getUsers).toHaveBeenCalled();
      expect(result).toEqual(mockDbUsersDto);
    });
  });

  describe('getUser', () => {
    it('Call the getUser method of the userRepository layer and return a DbUserDto entity', async () => {
      const id = 35;
      jest.spyOn(userRepository, 'getUser').mockResolvedValue(mockDbUserDto);
      const result = await userService.getUser(id);

      expect(userRepository.getUser).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDbUserDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('createUser', () => {
    it('Call the createUser method of the userRepository layer and return a new DbUserDto entity', async () => {
      jest.spyOn(userRepository, 'createUser').mockResolvedValue(mockDbUserDto);
      const result = await userService.createUser(mockNewUserDto);

      expect(userRepository.createUser).toHaveBeenCalledWith(mockNewUserDto);
      expect(result).toEqual(mockDbUserDto);
    });
  });

  describe('updateUser', () => {
    it('Call the updateUser method of the userRepository layer and it should return an updated DbUserDto entity', async () => {
      jest.spyOn(userRepository, 'updateUser').mockResolvedValue(mockDbUserDto);
      const result = await userService.updateUser(mockUpdateUserDto);

      expect(userRepository.updateUser).toHaveBeenCalledWith(mockUpdateUserDto);
      expect(result).toEqual(mockDbUserDto);
      expect(result.id).toEqual(mockUpdateUserDto.id);
    });
  });

  describe('deleteUser', () => {
    it('Call the deleteUser method of the userRepository layer and return the deleted Dto entity', async () => {
      const id = 4454;
      const deleteResult: DeleteResult = {
        raw: undefined,
        affected: 1,
      };

      jest.spyOn(userRepository, 'deleteUser').mockResolvedValue(deleteResult);
      const result = await userService.deleteUser(id);

      expect(userRepository.deleteUser).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
