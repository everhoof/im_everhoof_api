import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DeepPartial, MoreThan } from 'typeorm';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { TypeOrmConfigService } from '@config/typeorm';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { UnauthorizedException } from '@common/exceptions/exceptions';

describe('AccountsService', () => {
  let service: AccountsService;
  let usersRepository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        TypeOrmModule.forFeature([TokensRepository, UsersRepository]),
      ],
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    usersRepository = module.get<UsersRepository>(getRepositoryToken(UsersRepository));
  });

  beforeEach(async () => {
    await usersRepository.delete({ id: MoreThan(0) });
  });

  describe('Registration with valid input', () => {
    const data: { test: string; input: SignUpArgs; result: DeepPartial<User> }[] = [
      {
        test: 'All data',
        input: {
          username: 'username',
          email: 'email@example.com',
          password: 'password',
        },
        result: {
          username: 'username',
          email: 'email@example.com',
        },
      },
    ];

    for (const { test: name, input, result } of data) {
      test(name, async () => {
        const user = await service.createUser(input);
        await expect(user).toMatchObject(result);
      });
    }
  });

  describe('Login with valid input', () => {
    beforeEach(async () => {
      await service.createUser({ username: 'username', email: 'email@example.com', password: 'password' });
    });

    const data: { test: string; input: SignInArgs }[] = [
      {
        test: 'With email',
        input: {
          email: 'email@example.com',
          password: 'password',
        },
      },
      {
        test: 'With username',
        input: {
          email: 'username',
          password: 'password',
        },
      },
    ];

    for (const { test: name, input } of data) {
      test(name, async () => {
        const token = await service.validateUserByEmailAndPassword({ email: input.email, password: input.password });
        expect(token).toBeInstanceOf(Token);
      });
    }
  });

  test('Login with invalid input', async () => {
    const input: SignInArgs = {
      email: 'invalid',
      password: 'invalid',
    };
    await expect(
      service.validateUserByEmailAndPassword({ email: input.email, password: input.password }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
