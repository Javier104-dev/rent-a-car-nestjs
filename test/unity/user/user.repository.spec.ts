import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../src/module/user/entity/user.entity';
import { UserRepository } from '../../../src/module/user/repository/user.repository';
import { DbUserDto } from 'src/module/user/dto/db.user.dto';
import { NewUserDto } from 'src/module/user/dto/new.user.dto';
import { UpdateUserDto } from 'src/module/user/dto/update.user.dto';
import { DeleteResult } from 'typeorm';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  const mockDbUsersDto: DbUserDto[] = [];
  const mockDbUserDto: DbUserDto = {
    id: 154,
    firstName: 'Nombre',
    lastName: 'Apellido',
    nationality: 'Argentina',
    address: 'Calle 456',
    phoneNumber: '41574 411 711',
    email: 'email@yahoo.com',
    birthdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockNewUserDto: NewUserDto = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    nationality: 'Argentina',
    address: 'Calle 456',
    phoneNumber: '41574 411 711',
    email: 'email@yahoo.com',
    birthdate: new Date(),
  };
  const mockUpdateUserDto: UpdateUserDto = {
    id: 154,
    ...mockNewUserDto,
  };
  const mockDeleteResult: DeleteResult = {
    raw: undefined,
    affected: 1,
  };

  const mockUserEntity = {
    find: jest.fn().mockReturnValue(mockDbUsersDto),
    findOne: jest.fn().mockReturnValue(mockDbUserDto),
    create: jest.fn().mockReturnValue(mockNewUserDto),
    save: jest.fn().mockReturnValue(mockDbUserDto),
    preload: jest.fn().mockReturnValue(mockUpdateUserDto),
    delete: jest.fn().mockReturnValue(mockDeleteResult),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { provide: getRepositoryToken(UserEntity), useValue: mockUserEntity },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getUsers', () => {
    it('Call TypeOrm find method and returns an array of DbUserDto entities', async () => {
      jest.spyOn(mockUserEntity, 'find');
      const result = await userRepository.getUsers();

      expect(mockUserEntity.find).toHaveBeenCalled();
      expect(result).toEqual(mockDbUsersDto);
    });
  });

  describe('getUser', () => {
    it('Call the TypeOrm findOne method and returns a DbUserDto entity', async () => {
      const id = 154;
      jest.spyOn(mockUserEntity, 'findOne');
      const result = await userRepository.getUser(id);

      expect(mockUserEntity.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockDbUserDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('createUser', () => {
    it('Call the TypeOrm create and save method and returns a DbUserDto entity', async () => {
      jest.spyOn(mockUserEntity, 'create');
      jest.spyOn(mockUserEntity, 'save');
      const result = await userRepository.createUser(mockNewUserDto);

      expect(mockUserEntity.create).toHaveBeenCalledWith(mockNewUserDto);
      expect(mockUserEntity.save).toHaveBeenCalledWith(mockNewUserDto);
      expect(result).toEqual(mockDbUserDto);
    });
  });

  describe('updateUser', () => {
    it('Call the TypeOrm preload and save method and returns a DbUserDto entity', async () => {
      jest.spyOn(mockUserEntity, 'preload');
      jest.spyOn(mockUserEntity, 'save');
      const result = await userRepository.updateUser(mockUpdateUserDto);

      expect(mockUserEntity.preload).toHaveBeenCalledWith(mockUpdateUserDto);
      expect(mockUserEntity.save).toHaveBeenCalledWith(mockUpdateUserDto);
      expect(result).toEqual(mockDbUserDto);
      expect(result.id).toEqual(mockUpdateUserDto.id);
    });
  });

  describe('deleteUser', () => {
    it('Call the TypeOrm delete method and returns a DeleteResult entity', async () => {
      jest.spyOn(mockUserEntity, 'delete');
      const id = 154;
      const result = await userRepository.deleteUser(id);

      expect(mockUserEntity.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
